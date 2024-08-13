export type GetAppRequestType = {
  organizationId: string;
  appId: string;
  version: string;
  skipCount: number;
  maxResultCount: number;
};

export type GetAppResponseType = {
  organizationName: string;
  organizationId: string;
  appId: string;
  appName: string;
  imageUrl: string;
  description: string;
  deployKey: string;
  sourceCodeUrl: string;
  createTime: string;
};
