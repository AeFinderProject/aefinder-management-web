import { createAppSlice } from '@/store/createAppSlice';

import { OrganizationsItem } from '@/types/appType';

export interface CommonSliceState {
  isLoading: boolean;
  username: string;
  organizationsCommon: OrganizationsItem[];
}

const initialState: CommonSliceState = {
  isLoading: false,
  username: '',
  organizationsCommon: [],
};

export const commonSlice = createAppSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setOrganizationsCommon: (state, action) => {
      state.organizationsCommon = action.payload;
    },
  },
});

export const { setIsLoading, setUsername, setOrganizationsCommon } =
  commonSlice.actions;
