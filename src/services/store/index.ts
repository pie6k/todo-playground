import { createSubscribtionChannel } from 'services/subscribtionChannel';
import { createPersistedStorage } from 'services/persistedStorage';
import { useNeededState } from 'services/useNeededState';
import { useEffect } from 'react';
import { StateUpdater } from 'services/updateState';
import { useMethod } from 'services/useMethod';

interface StoreConfig<T> {
  initialValue: T;
  persistanceKey: string;
}

export function createStore<T>(config: StoreConfig<T>) {
  const channel = createSubscribtionChannel<T>(config.initialValue);
  const storage = createPersistedStorage<T>(config.persistanceKey, config.initialValue);

  channel.publishNext(storage.get());

  channel.subscribe((newValue) => {
    storage.set(newValue);
  });

  function useStore<S = T>(selector: (storeValue: T) => S = (store) => (store as any) as S) {
    const getSelectedValue = useMethod((storeValue: T) => {
      if (!selector) {
        return (storeValue as any) as S;
      }

      return selector(storeValue);
    });

    const [selectedValue, setSelectedValue] = useNeededState(() => {
      return getSelectedValue(channel.getLastValue());
    });

    useEffect(() => {
      channel.subscribe((storeValue) => {
        setSelectedValue(getSelectedValue(storeValue));
      });
    }, [getSelectedValue, setSelectedValue]);

    function update(updater: StateUpdater<T>) {
      channel.update(updater);
    }

    return [selectedValue, update] as const;
  }

  return [useStore] as const;
}
