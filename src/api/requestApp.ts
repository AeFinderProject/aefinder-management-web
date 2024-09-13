import { handleErrorMessage } from '@/lib/utils';

import { getLocalJWT } from './apiUtils';
import { request } from './index';
import { AppList } from './list';

import {
  ActionAppRequestType,
  BatchActionRequestType,
  BatchDeployRequestType,
  BatchLimitItemRequestType,
  DeployAppRequestType,
  GetAppDetailRequestType,
  GetAppRequestType,
  GetAppResourceLimitResponse,
  GetAppResponseItem,
  GetAppResponseType,
  GetResourcesResponse,
  GetSubscriptionResponse,
  LimitItemType,
  OrganizationsQuestType,
  OrganizationsResponseType,
  SetAppLimitRequestType,
  SetMaxAppCountQuestType,
} from '@/types/appType';
export const getOrganizations = async (
  params: OrganizationsQuestType
): Promise<OrganizationsResponseType> => {
  try {
    const res = await request.app.getOrganizations({ params });
    return res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getOrganizations error'));
  }
};

/**
 * getAppList
 * @param params GetAppRequestType
 * @returns GetAppResponseType
 */
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

export const getAppDetail = async (
  params: GetAppDetailRequestType
): Promise<GetAppResponseItem> => {
  try {
    const { appId } = params;
    const res = await request.app.getAppDetail({ query: appId });
    return res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getAppDetail error'));
  }
};

export const getManifest = async (
  params: GetAppDetailRequestType
): Promise<GetSubscriptionResponse> => {
  try {
    const { appId } = params;
    const res = await request.app.getManifest({ query: appId });
    return res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getManifest error'));
  }
};

export const getResources = async (
  params: GetAppDetailRequestType
): Promise<GetResourcesResponse> => {
  try {
    const { appId } = params;
    const res = await request.app.getResources({ query: appId });
    return res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getResources error'));
  }
};

export const getAppLimitList = async (
  params: GetAppRequestType
): Promise<GetAppResourceLimitResponse> => {
  try {
    const res = await request.app.getLimitsList({ params });
    return res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getAppLimitList error'));
  }
};

export const setAppLimit = async (
  params: SetAppLimitRequestType
): Promise<LimitItemType> => {
  try {
    const { appId, ...rest } = params;
    const res = await request.app.setAppLimit({ query: appId, data: rest });
    return res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'setAppLimit error'));
  }
};

export const destroyApp = async (params: ActionAppRequestType) => {
  try {
    const res = await request.app.destroyApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'destroyApp error'));
  }
};

export const deployApp = async (params: DeployAppRequestType) => {
  try {
    const res = await request.app.deployApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'deployApp error'));
  }
};

export const updateApp = async (params: DeployAppRequestType) => {
  try {
    const res = await request.app.updateApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'updateApp error'));
  }
};

export const restartApp = async (params: ActionAppRequestType) => {
  try {
    const res = await request.app.restartApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'restartApp error'));
  }
};

export const pauseApp = async (params: ActionAppRequestType) => {
  try {
    const res = await request.app.pauseApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'pauseApp error'));
  }
};

export const upgradeApp = async (params: GetAppDetailRequestType) => {
  try {
    const res = await request.app.upgradeApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'upgradeApp error'));
  }
};

export const stopApp = async (params: ActionAppRequestType) => {
  try {
    const res = await request.app.stopApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'stopApp error'));
  }
};

export const batchSetAppLimit = async (params: BatchLimitItemRequestType) => {
  try {
    const res = await request.app.batchSetAppLimit({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'batchSetAppLimit error'));
  }
};

export const batchDestroyApp = async (params: BatchActionRequestType) => {
  try {
    const res = await request.app.batchDestroyApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'batchDestroyApp error'));
  }
};

export const batchDeployApp = async (params: BatchDeployRequestType) => {
  try {
    const res = await request.app.batchDeployApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'batchDeployApp error'));
  }
};

export const batchUpdateApp = async (params: BatchDeployRequestType) => {
  try {
    const res = await request.app.batchUpdateApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'batchUpdateApp error'));
  }
};

export const batchRestartApp = async (params: BatchActionRequestType) => {
  try {
    const res = await request.app.batchRestartApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'batchRestartApp error'));
  }
};

export const batchPauseApp = async (params: BatchActionRequestType) => {
  try {
    const res = await request.app.batchPauseApp({ data: params });
    return !res;
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'batchPauseApp error'));
  }
};

export const setMaxAppCountApi = async (
  params: SetMaxAppCountQuestType
): Promise<boolean> => {
  let response = false;
  try {
    const { organizationId, maxAppCount } = params;
    const localData = getLocalJWT('LocalJWTData');
    const urlEncodedData = new URLSearchParams({
      maxAppCount: String(maxAppCount),
    }).toString();
    let status = 0;
    await fetch(
      `${AppList.setMaxAppCount.target}/${organizationId}/max-app-count`,
      {
        method: 'PUT',
        body: urlEncodedData,
        headers: {
          Authorization: `${localData?.token_type} ${localData?.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
      .then((res: Response) => {
        response = res?.ok;
        status = res?.status;
        return res;
      })
      .then((data) => {
        // tip data error when status is 400 403 500
        if (status >= 400) {
          throw new Error(handleErrorMessage(data, 'setMaxAppCount error'));
        } else {
          return response;
        }
      });
    return true;
  } catch (error) {
    console.log('error', error);
    return response;
  }
};
