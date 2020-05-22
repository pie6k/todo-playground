import { proxyEqual, proxyState, ProxyStateResult, sourceMutationsEnabled } from 'proxyequal';
import { useCallback, useMemo, useRef, useState } from 'react';
import { isPrimivite, StateUpdater, updateState } from './updateState';

/**
 * It works the same way as useState, but it'll watch what parts of state object
 * are used during each render.
 *
 * If some part of the state is changed, but it is not used during the render
 * there is no point in re-rendering (assuming renders are pure), so render will be skipped
 *
 */
export function useNeededState<T>(initialValue: T | (() => T), debugId?: string) {
  const [originalValue, setValue] = useState(initialValue);
  const valueProxySpy = useMemo(
    () => proxyState<PrimiviteWrapper<T>>(wrapValue(originalValue)),
    // we intentionally don't want to update value spy during entire lifecycle of the component
    /* eslint-disable react-hooks/exhaustive-deps */
    [],
  );

  const currentValueRef = useRef(originalValue);

  const updateState = useCallback((stateUpdater: StateUpdater<T>) => {
    const currentValue = currentValueRef.current;
    const newValue = getNextStateIfChanged(currentValue, stateUpdater, valueProxySpy);

    currentValueRef.current = newValue;

    if (newValue === currentValue) {
      return;
    }

    setValue(newValue);
  }, []);

  return [
    unwrapValue(valueProxySpy.state),
    updateState,
    { getCurrentState: () => currentValueRef.current },
  ] as const;
}

// if state included things like React node - it might be mutated by render
sourceMutationsEnabled(true);

/**
 * State might be primitive. Proxy Equal does not support primitives yet. That's why
 * I'm always wrapping values in a small object and keep/compare it inside it,
 * while when returning - I'm unwrapping it
 */

interface PrimiviteWrapper<T> {
  __value: T;
}

function wrapValue<T>(value: T): PrimiviteWrapper<T> {
  return { __value: value };
}

function unwrapValue<T>(wrapped: PrimiviteWrapper<T>): T {
  return wrapped.__value;
}

function compareMaybePrimitives(a: any, b: any): boolean | null {
  if (a === b) {
    return true;
  }

  if (isPrimivite(a) || isPrimivite(b)) {
    return false;
  }

  return null;
}

function getNextStateIfChanged<T>(
  currentValue: T,
  newStateAction: StateUpdater<T>,
  valueProxySpy: ProxyStateResult<PrimiviteWrapper<T>>,
) {
  const newValue = updateState(currentValue, newStateAction);

  const isEqualIfPrimitive = compareMaybePrimitives(newValue, currentValue);

  if (isEqualIfPrimitive === true) {
    return currentValue;
  }

  if (isEqualIfPrimitive === false) {
    valueProxySpy.replaceState(wrapValue(newValue));
    return newValue;
  }

  // value is not primitive and the only useage was unwrapping primitive wrapper. it means value was not really used in any way so we can skip update
  if (valueProxySpy.affected.length === 1) {
    return currentValue;
  }

  const isUsedPartSame = proxyEqual(
    wrapValue(newValue),
    wrapValue(currentValue),
    valueProxySpy.affected,
  );

  if (isUsedPartSame) {
    return currentValue;
  }

  valueProxySpy.replaceState(wrapValue(newValue));

  return newValue;
}
