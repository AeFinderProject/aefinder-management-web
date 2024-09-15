import { createAppSlice } from '@/store/createAppSlice';

import {
  GetAppResourceLimitItemType,
  GetAppResponseItem,
  OrganizationsItem,
} from '@/types/appType';

export interface AppSliceState {
  appList: GetAppResponseItem[];
  appLimitList: GetAppResourceLimitItemType[];
  organizationsList: OrganizationsItem[];
}

const initialState: AppSliceState = {
  appList: [],
  appLimitList: [],
  organizationsList: [],
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
  },
});

export const { setAppList, setAppLimitList, setOrganizationsList } =
  appSlice.actions;
