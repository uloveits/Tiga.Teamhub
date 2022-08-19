import { getFromLS, saveToLS } from '@/utils';
import { observable, action } from 'mobx';

export interface IRouterStoreProps {
  pathNames: string[];
}

const PATH_NAMES = 'PATH_NAMES';
const STORE_ROUTER = 'routerStore';

class RouterStore implements IRouterStoreProps {
  @observable pathNames: string[] = getFromLS(PATH_NAMES) || [];

  @action.bound
  setPathNames = (_pathNames: string[]) => {
    this.pathNames = _pathNames;
    saveToLS(PATH_NAMES, _pathNames);
  };
}

export { RouterStore, STORE_ROUTER };
