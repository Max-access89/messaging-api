import '@azure/functions';

declare module '@azure/functions' {
  export interface InvocationContext {
    auth: IAuth;
  }
}

export interface IAuth {
  user_info: {
    email: string;
    name: string;
    uid: string;
  };
  organization: {
    createdAt: string;
    id: string;
    name: string;
    sector: string;
    updatedAt: string;
    roles: Array<string>;
  };
  engine: {
    apiKey: string;
    apiSecret: string;
    status: string;
    url: string;
    userCredStatus: string;
  };
  iss: string;
  sub: string;
  aud: Array<string>;
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  gty: string;
  permissions: Array<string>;
}
