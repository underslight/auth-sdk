import { ApiClient } from "src/client";
import { User } from "src/user";

export enum AuthMethodType {
    EmailPassword = "EmailPassword",
}

export interface AuthMethod {
    readonly type: AuthMethodType;
    mfa_code?: MfaCode,
    
    authenticate: (client: ApiClient, successRedirect?: string) => Promise<User>;
    register: (client: ApiClient, successRedirect?: string) => Promise<User>;
    link: (client: ApiClient) => Promise<void>;
    unlink: (client: ApiClient) => Promise<void>;
}

export enum MfaMethodType {
    Totp = "Totp",
}

export interface MfaCode {
    readonly method: MfaMethodType,
    readonly data: string,
}

export interface MfaMethod {
    readonly type: MfaMethodType;
    
    link: (client: ApiClient) => Promise<void>;
    unlink: (client: ApiClient) => Promise<void>;
}