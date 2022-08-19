import React from 'react';
import { RouterStore, STORE_ROUTER } from './router';

const createStores = () => {
  return {
    [STORE_ROUTER]: new RouterStore(),
  };
};

const stores = createStores();

const StoresContext = React.createContext(stores);

const useStores = () => React.useContext(StoresContext);

const useRouterStore = () => {
  const { routerStore } = useStores();
  return routerStore;
};

export { stores, StoresContext, useRouterStore };
