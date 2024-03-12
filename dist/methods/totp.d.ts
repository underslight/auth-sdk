import { ApiClient } from "src/client";
import { MfaMethod, MfaMethodType } from ".";
export declare class TotpMethod implements MfaMethod {
    readonly type = MfaMethodType.Totp;
    constructor();
    link(client: ApiClient): Promise<void>;
    unlink(client: ApiClient): Promise<void>;
}
