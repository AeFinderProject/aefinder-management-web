import { handleErrorMessage } from '@/lib/utils';

import {
  GetAppLimitRequest,
  GetAppRequestType,
  GetAppResourceLimitResponse,
  GetAppResponseType,
} from '@/types/appType';

export const getAppList = async (
  params: GetAppRequestType
): Promise<GetAppResponseType> => {
  try {
    // const res = await request.app.getAppsList({ params });
    // return res;
    return {
      items: [
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app1',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 0,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app2',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 1,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app3',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 2,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app4',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 0,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app5',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 0,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app6',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 0,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app7',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 0,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app8',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 0,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app9',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 0,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app10',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 0,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
        {
          organizationName: 'aelfscan',
          organizationId: '29e77c02-0cbb-5e0d-bcc1-3a132c943290',
          appId: 'block_chain_app11',
          appName: 'block chain app',
          imageUrl: '',
          description: '',
          deployKey: '',
          sourceCodeUrl: '',
          status: 0,
          createTime: '',
          updateTime: '',
          versions: {
            currentVersion: 'xxxxxx',
            pendingVersion: 'xxxxxx',
          },
        },
      ],
      totalCount: 11,
    };
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getAppsList error'));
  }
};

export const getAppLimitList = async (
  params: GetAppLimitRequest
): Promise<GetAppResourceLimitResponse> => {
  try {
    // const res = await request.app.getLimitsList({ params });
    // return res;
    return {
      items: [],
      totalCount: 0,
    };
  } catch (error) {
    throw new Error(handleErrorMessage(error, 'getAppLimit error'));
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
