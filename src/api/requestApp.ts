import { handleErrorMessage } from '@/lib/utils';

import { request } from './index';

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
  SetAppLimitRequestType,
} from '@/types/appType';

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
