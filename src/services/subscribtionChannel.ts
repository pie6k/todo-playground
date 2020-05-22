import { StateUpdater, updateState } from './updateState';
import { unstable_batchedUpdates } from 'react-dom';

export type SubscribtionHandler<T> = (value: T, previousValue: T | undefined) => void;

export interface SubscribtionChannel<T> {
  publishNext(value: T, ignoredHandler?: SubscribtionHandler<T>): void;
  subscribe(handler: SubscribtionHandler<T>, handleCurrentValue?: boolean): () => void;
  getLastValue(): T;
  update(updater: StateUpdater<T>): void;
}

/**
 * Create simple value channel that you can subscribe to
 */
export function createSubscribtionChannel<T>(initialValue: T): SubscribtionChannel<T> {
  const subscribtions: Array<SubscribtionHandler<T>> = [];
  let lastValue = initialValue;

  function publishNext(value: T) {
    const previousValue = lastValue;
    lastValue = value;

    unstable_batchedUpdates(() => {
      [...subscribtions].forEach((handler) => {
        handler(value, previousValue);
      });
    });
  }

  function subscribe(handler: SubscribtionHandler<T>, handleCurrentValue = true) {
    subscribtions.push(handler);

    if (handleCurrentValue && lastValue !== undefined) {
      handler(lastValue, lastValue);
    }

    return () => {
      subscribtions.splice(subscribtions.indexOf(handler), 1);
    };
  }

  function getLastValue() {
    return lastValue;
  }

  function update(updater: StateUpdater<T>) {
    const lastValue = getLastValue();

    publishNext(updateState(lastValue, updater));
  }

  return {
    publishNext,
    subscribe,
    getLastValue,
    update,
  };
}
