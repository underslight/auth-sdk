import { ApiClient } from "src/client";
import { User } from "src/user";
import { AuthMethodType, AuthMethod, MfaCode } from ".";
export declare class EmailPasswordMethod implements AuthMethod {
    readonly type = AuthMethodType.EmailPassword;
    mfa_code?: MfaCode;
    private email;
    private password;
    constructor(email: string, password: string, mfa_code?: MfaCode);
    setMfaCode(mfa_code?: MfaCode): void;
    authenticate(client: ApiClient, successRedirect?: string): Promise<User>;
    register(client: ApiClient, successRedirect?: string): Promise<User>;
    link(client: ApiClient): Promise<void>;
    unlink(client: ApiClient): Promise<void>;
}
