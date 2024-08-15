// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AeFinderHost } from '@/constant';

import { API_REQ_FUNCTION } from './apiType';
export const DEFAULT_METHOD = 'GET';

/**
 * api request configuration directory
 * @example
 *    upload: {
 *      target: '/api/file-management/file-descriptor/upload',
 *      baseConfig: { method: 'POST', },
 *    },
 * or:
 *    upload:'/api/file-management/file-descriptor/upload'
 *
 * @description api configuration default method is from DEFAULT_METHOD
 * @type {UrlObj}  // The type of this object from UrlObj.
 */

export const AuthList = {
  token: {
    target: '/connect/token',
    baseConfig: { method: 'POST' },
  },
  resetPassword: {
    target: `${AeFinderHost}/api/users/reset/password`,
    baseConfig: { method: 'POST' },
  },
};

export const AppList = {
  getOrganizationsList: `${AeFinderHost}/api/manage/organizations`,
  getAppsList: `${AeFinderHost}/api/management/apps`,
  getAppDetail: `${AeFinderHost}/api/management/apps`,
  getManifest: `${AeFinderHost}/api/subscriptions/manifest`,
  getResources: `${AeFinderHost}/api/apps/resources`,
  getLimitsList: `${AeFinderHost}/api/apps/resource-limits`,
  setAppLimit: {
    target: `${AeFinderHost}/api/apps/set-limit`,
    baseConfig: { method: 'PUT' },
  },
  destroyApp: {
    target: `${AeFinderHost}/api/app-deploy/destroy`,
    baseConfig: { method: 'POST' },
  },
  deployApp: {
    target: `${AeFinderHost}/api/app-deploy/deploy`,
    baseConfig: { method: 'POST' },
  },
  restartApp: {
    target: `${AeFinderHost}/api/app-deploy/restart`,
    baseConfig: { method: 'POST' },
  },
  pauseApp: {
    target: `${AeFinderHost}/api/block-scan/pause`,
    baseConfig: { method: 'POST' },
  },
  upgradeApp: {
    target: `${AeFinderHost}/api/block-scan/upgrade`,
    baseConfig: { method: 'POST' },
  },
  stopApp: {
    target: `${AeFinderHost}/api/block-scan/stop`,
    baseConfig: { method: 'POST' },
  },
  batchSetApp: {
    target: `${AeFinderHost}/api/apps/resource-limits`,
    baseConfig: { method: 'PUT' },
  },
  batchDestroyApp: {
    target: `${AeFinderHost} /api/app-deploy/batch-destroy`,
    baseConfig: { method: 'POST' },
  },
  batchDeployApp: {
    target: `${AeFinderHost} /api/app-deploy/batch-deploy`,
    baseConfig: { method: 'POST' },
  },
  batchRestartApp: {
    target: `${AeFinderHost} /api/app-deploy/batch-restart`,
    baseConfig: { method: 'POST' },
  },
  batchPauseApp: {
    target: `${AeFinderHost}/api/block-scan/batch-pause`,
    baseConfig: { method: 'POST' },
  },
};

/**
 * api request extension configuration directory
 * @description object.key // The type of this object key comes from from @type {UrlObj}
 */
export const EXPAND_APIS = {
  auth: AuthList,
  app: AppList,
};

export type EXPAND_REQ_TYPES = {
  [X in keyof typeof EXPAND_APIS]: {
    [K in keyof (typeof EXPAND_APIS)[X]]: API_REQ_FUNCTION;
  };
};
