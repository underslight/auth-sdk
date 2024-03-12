import { UnderslightAuth } from "./auth";
import { MfaMethod } from "./methods";
export interface UserAttributes {
    [prop: string]: any;
}
export interface UserMetadata {
    disabled: string[] | null;
    verified: boolean;
    last_access: number;
    last_password_reset: number;
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
    linkMfaMethod(auth: UnderslightAuth, mfa_method: MfaMethod): Promise<User>;
    unlinkMfaMethod(auth: UnderslightAuth, mfa_method: MfaMethod): Promise<User>;
}
