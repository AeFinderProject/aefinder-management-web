export type GetAppRequestType = {
  organizationId?: string;
  appId?: string;
  skipCount?: number;
  maxResultCount?: number;
};

export type GetAppDetailRequestType = {
  appId: string;
};

export enum AppStatus {
  UnDeployed = 0,
  Deployed = 1,
}

// Initialized = 0, Started = 1, Paused = 2
export enum SubscriptionStatusType {
  Initialized = 0,
  Started = 1,
  Paused = 2,
}

export type GetAppResponseItem = {
  organizationName: string;
  organizationId: string;
  appId: string;
  appName: string;
  imageUrl: string;
  description: string;
  deployKey: string;
  sourceCodeUrl: string;
  status: AppStatus.UnDeployed | AppStatus.Deployed;
  createTime: string;
  updateTime: string;
  versions: {
    currentVersion: string;
    pendingVersion: string;
  };
};

export type GetAppResponseType = {
  items: GetAppResponseItem[];
  totalCount: number;
};

export type ConfirmActionType =
  | 'Destroy Services'
  | 'Restart DApp'
  | 'Stop DApp'
  | 'Pause DApp';

export type UpdateType = 'batch' | 'single';

export type ChainIdType = 'tDVV' | 'tDVW' | 'AELF' | '';

export type SubscriptionItem = {
  chainId: ChainIdType;
  startBlockNumber: number;
  onlyConfirmed: boolean;
  transactions: {
    to: string;
    methodNames: string[];
  }[];
  logEvents: {
    contractAddress: string;
    eventNames: string[];
  }[];
};

export type SubscriptionItems = {
  subscriptionItems: SubscriptionItem[];
};

export type VersionType = {
  appId: string;
  version: string;
  subscriptionStatus: number;
  subscriptionManifest: SubscriptionItems;
};

export type GetSubscriptionResponse = VersionType[];

export type resourcesType = {
  appId: string;
  version: string;
  dockerImage: string;
};

export type GetResourcesResponse = resourcesType[];

export type GetAppResourceLimitItemType = {
  organizationName: string;
  organizationId: string;
  appId: string;
  appName: string;
  resourceLimit: {
    appFullPodRequestCpuCore: string;
    appFullPodRequestMemory: string;
    appQueryPodRequestCpuCore: string;
    appQueryPodRequestMemory: string;
    appPodReplicas: number;
  };
  operationLimit: {
    maxEntityCallCount: number;
    maxEntitySize: number;
    maxLogCallCount: number;
    maxLogSize: number;
    maxContractCallCount: number;
  };
};

export type GetAppResourceLimitResponse = {
  items: GetAppResourceLimitItemType[];
  totalCount: number;
};

export type LimitItemType = {
  maxEntityCallCount?: number;
  maxEntitySize?: number;
  maxLogCallCount?: number;
  maxLogSize?: number;
  maxContractCallCount?: number;
  appFullPodRequestCpuCore?: string;
  appFullPodRequestMemory?: string;
  appQueryPodRequestCpuCore?: string;
  appQueryPodRequestMemory?: string;
  appPodReplicas?: number;
  maxAppCodeSize?: number;
  maxAppAttachmentSize?: number;
  enableMultipleInstances?: boolean;
};

export type SetAppLimitRequestType = {
  appId: string;
} & LimitItemType;

export type ActionAppRequestType = {
  appId: string;
  version: string;
};

export type DeployAppRequestType = {
  appId: string;
  version: string;
  imageName: string;
  isUpdateConfig?: boolean;
};

export type BatchLimitItemRequestType = {
  appId?: string;
  appIds?: string[];
} & LimitItemType;

export type BatchActionRequestType = {
  appIds: string[];
};

export type BatchDeployRequestType = {
  imageName: string;
  isUpdateConfig?: boolean;
} & BatchActionRequestType;

export type OrganizationsQuestType = {
  skipCount: number;
  maxResultCount: number;
};

export type OrganizationsItem = {
  organizationId: string;
  organizationName: string;
  maxAppCount: number;
  appIds: string[];
};

export type OrganizationsResponseType = {
  items: OrganizationsItem[];
  totalCount: number;
};

export type SetMaxAppCountQuestType = {
  organizationId: string;
  maxAppCount: number;
};
