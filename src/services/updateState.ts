import produce from 'immer';

export type StateUpdater<S> = Partial<S> | ((oldState: S) => void);

/**
 * Simple wrapper around immer that helps mutating state objects
 */
export function updateState<S>(oldState: S, updater: StateUpdater<S>): S {
  if (typeof updater === 'function') {
    const newState = produce(oldState, (draft) => {
      return updater(draft as S);
    });

    return newState;
  }

  // if value is primitive, we replace value as is
  if (isPrimivite(updater)) {
    return (updater as any) as S;
  }

  // if it's array - again - replace old value with new result
  if (Array.isArray(updater)) {
    return (updater as any) as S;
  }

  // if it's object - allow passing partial object data and merge it together with previous value
  return { ...oldState, ...updater };
}

type Primitive = string | number | boolean | null | undefined | void;

function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export function isPrimivite(input: any): input is Primitive {
  return !isObject(input);
}
