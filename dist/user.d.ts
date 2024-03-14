import { UnderslightAuth } from "./auth";
import { AuthMethod, MfaMethod } from "./methods";
export interface UserAttributes {
    custom: {
        [prop: string]: any;
    };
}
export interface UserMetadata {
    readonly disabled: string[] | null;
    readonly verified: boolean;
    readonly last_access: number;
    readonly last_password_reset: number;
}
export interface UserData {
    readonly id: string;
    attributes: UserAttributes;
    readonly metadata: UserMetadata;
}
export declare class User {
    readonly id: string;
    attributes: UserAttributes;
    readonly metadata: UserMetadata;
    constructor({ id, attributes, metadata }: UserData);
    linkAuthMethod(auth: UnderslightAuth, auth_method: AuthMethod): Promise<User>;
    unlinkAuthMethod(auth: UnderslightAuth, auth_method: AuthMethod): Promise<User>;
    linkMfaMethod(auth: UnderslightAuth, mfa_method: MfaMethod): Promise<User>;
    unlinkMfaMethod(auth: UnderslightAuth, mfa_method: MfaMethod): Promise<User>;
    delete(auth: UnderslightAuth): Promise<void>;
    update(auth: UnderslightAuth): Promise<User>;
}
