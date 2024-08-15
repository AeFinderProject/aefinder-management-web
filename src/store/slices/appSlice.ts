import { createAppSlice } from '@/store/createAppSlice';

import {
  GetAppResourceLimitItemType,
  GetAppResponseItem,
} from '@/types/appType';

export interface AppSliceState {
  appList: GetAppResponseItem[];
  appLimitList: GetAppResourceLimitItemType[];
}

const initialState: AppSliceState = {
  appList: [],
  appLimitList: [],
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
  },
});

export const { setAppList, setAppLimitList } = appSlice.actions;
