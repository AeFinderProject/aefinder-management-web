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
  | 'Restart AeIndexer'
  | 'Stop AeIndexer'
  | 'Pause AeIndexer';

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
    enableMultipleInstances: boolean;
    appFullPodLimitCpuCore: string;
    appFullPodLimitMemory: string;
  };
  operationLimit: {
    maxEntityCallCount: number;
    maxEntitySize: number;
    maxLogCallCount: number;
    maxLogSize: number;
    maxContractCallCount: number;
  };
  deployLimit: {
    maxAppCodeSize: number;
    maxAppAttachmentSize: number;
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
  appFullPodLimitCpuCore?: string;
  appFullPodLimitMemory?: string;
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

export type DeployPodsQuestType = {
  appId: string;
  pageSize: number;
  continueToken: string;
};

export type ContainersType = {
  containerID: string;
  containerName: string;
  containerImage: string;
  restartCount: number;
  ready: boolean;
  currentState: string;
};

export type PodInfosType = {
  podUid: string;
  podName: string;
  appId: string;
  appVersion: string;
  status: string;
  podIP: string;
  nodeName: string;
  startTime: string;
  readyContainersCount: number;
  totalContainersCount: number;
  ageSeconds: number;
  containers: ContainersType[];
};

export type DeployPodsResponseType = {
  continueToken: string;
  podInfos: PodInfosType[];
};

export type GetMerchandisesRequestType = {
  type?: number | null;
  category?: number | null;
};

export enum MerchandiseTypeEnum {
  ApiQuery = 0,
  Processor = 1,
  Storage = 2,
}

export enum MerchandiseCategoryEnum {
  ApiQuery = 0,
  ProcessorOrStorage = 1,
}

export enum ChargeTypeEnum {
  Periodic = 0,
  OneTime = 1,
}

export enum MerchandiseStatusEnum {
  Unpublish = 0,
  Publish = 1,
}

export type MerchandisesItemType = {
  id?: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  chargeType: ChargeTypeEnum;
  type: MerchandiseTypeEnum;
  category: MerchandiseCategoryEnum;
  specification: string;
  sortWeight?: number;
  status: MerchandiseStatusEnum;
};

export type GetMerchandisesResponseType = {
  items: MerchandisesItemType[];
};

export type UnfreezeRequestType = {
  organizationId: string;
  billingId?: string;
};

export enum BillingEnum {
  SettledBill = 0,
  PreDeductedBill = 1,
}

export enum SortEnum {
  Asc = 0,
  Desc = 1,
}

export type GetBillingsListRequest = {
  startTime?: string;
  endTime?: string;
  type?: BillingEnum;
  sortType: SortEnum;
  skipCount: number;
  maxResultCount: number;
  organizationId?: string;
};

export enum MerchandisesEnum {
  ApiQuery = 0,
  Processor = 1,
  Storage = 2,
}

export enum CategoryEnum {
  ApiQuery = 0,
  ProcessorStorage = 1,
}

export type MerchandisesItem = {
  id: string;
  name: string;
  description: string;
  specification: string;
  unit: string;
  price: number;
  chargeType: number;
  type: MerchandisesEnum;
  category: CategoryEnum;
};

export type AssetsItem = {
  id: string;
  organizationId: string;
  merchandise: MerchandisesItem;
  paidAmount: number;
  quantity: number;
  replicas: number;
  freeQuantity: number;
  freeReplicas: number;
  beginTime: string;
  startTime: string;
  endTime: string;
  status: number;
  appId: string;
  isLocked: boolean;
};

export type BillingDetailsItem = {
  name: string;
  appId: string;
  type: number;
  unit: string;
  price: number;
  quantity: number;
  replicas: number;
  refundAmount: number;
  paidAmount: number;
  merchandise: MerchandisesItem;
  asset: AssetsItem;
};

export enum BillingType {
  APIQuery = 0,
  Processor = 1,
  Storage = 2,
}

export type BillingItem = {
  id: string;
  organizationId: string;
  beginTime: string;
  endTime: string;
  type: BillingType;
  details: BillingDetailsItem[];
  refundAmount: number;
  paidAmount: number;
  status: number;
  transactionId: string;
  createTime: string;
  paymentTime: string;
};

export type GetBillingsListResponse = {
  items: BillingItem[];
  totalCount: number;
};

export type GetBillingsDetailRequest = {
  id: string;
};
