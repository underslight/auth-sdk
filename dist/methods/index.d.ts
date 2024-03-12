import { ApiClient } from "src/client";
import { User } from "src/user";
export declare enum AuthMethodType {
    EmailPassword = "EmailPassword"
}
export interface AuthMethod {
    readonly type: AuthMethodType;
    mfa_code?: MfaCode;
    authenticate: (client: ApiClient) => Promise<User>;
    register: (client: ApiClient) => Promise<User>;
}
export declare enum MfaMethodType {
    Totp = "Totp"
}
export interface MfaCode {
    readonly method: MfaMethodType;
    readonly data: string;
}
export interface MfaMethod {
    readonly type: MfaMethodType;
    link: (client: ApiClient) => Promise<void>;
    unlink: (client: ApiClient) => Promise<void>;
}
