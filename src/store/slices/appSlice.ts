import { createAppSlice } from '@/store/createAppSlice';

import {
  GetAppResourceLimitItemType,
  GetAppResponseItem,
  OrganizationsItem,
  PodInfosType,
} from '@/types/appType';

export interface AppSliceState {
  appList: GetAppResponseItem[];
  appLimitList: GetAppResourceLimitItemType[];
  organizationsList: OrganizationsItem[];
  podInfosList: PodInfosType[];
}

const initialState: AppSliceState = {
  appList: [],
  appLimitList: [],
  organizationsList: [],
  podInfosList: [],
};

export const appSlice = createAppSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppList: (state, action) => {
      state.appList = action.payload;
    },
    setAppLimitList: (state, action) => {
      state.appLimitList = action.payload;
    },
    setOrganizationsList: (state, action) => {
      state.organizationsList = action.payload;
    },
    setPodInfosList: (state, action) => {
      state.podInfosList = action.payload;
    },
  },
});

export const {
  setAppList,
  setAppLimitList,
  setOrganizationsList,
  setPodInfosList,
} = appSlice.actions;
