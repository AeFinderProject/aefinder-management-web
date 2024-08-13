import { handleErrorMessage } from '@/lib/utils';

import { request } from './index';

import {
  GetAppRequestType,
  GetAppResponseType,
} from '@/types/appType';
import { ResetPasswordRequest } from '@/types/loginType';

export const getAppList = async (
  params: GetAppRequestType
): Promise<GetAppResponseType> => {
  try {
    const res = await request.app.getAppsList({ params });
    return res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getAppsList error'));
  }
};

// export const modifyApp = async (
//   params: ModifyAppRequest
// ): Promise<CreateAppResponse> => {
//   try {
//     const { appId, ...rest } = params;
//     const res = await request.app.modifyApp({ query: appId, data: rest });
//     return res;
//   } catch (error) {
//     throw new Error(handleErrorMessage(error, 'modifyApp error'));
//   }
// };

export const resetPassword = async (
  params: ResetPasswordRequest
): Promise<boolean> => {
  try {
    const res: boolean = await request.auth.resetPassword({ data: params });
    return res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'resetPassword error'));
  }
};
