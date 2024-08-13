import { createAppSlice } from '@/store/createAppSlice';

import { GetAppResponseType } from '@/types/appType';

export interface AppSliceState {
  appList: GetAppResponseType[];
}

const initialState: AppSliceState = {
  appList: [],
};

export const appSlice = createAppSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppList: (state, action) => {
      state.appList = action.payload;
    },
  },
});

export const {
  setAppList,
} = appSlice.actions;
