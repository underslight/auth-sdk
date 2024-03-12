import { ApiClient, ApiError } from "src/client";
import { MfaMethod, MfaMethodType } from ".";

export class TotpMethod implements MfaMethod {
    readonly type = MfaMethodType.Totp;

    constructor () {}

    link(client: ApiClient): Promise<void> {
        return new Promise(async (resolve, reject) => {

            // Forms the request
            const request = {
                mfa_method: this.type,
            };

            // Sends the API request
            await client 
                .client
                .post("/link/mfa", request)
                .then(_ => resolve())
                .catch(({ response }) => reject(response.data as ApiError));
        })
    };

    unlink(client: ApiClient): Promise<void> {
        return new Promise(async (resolve, reject) => {

            // Forms the request
            const request = {
                mfa_method: this.type,
            };

            // Sends the API request
            await client 
                .client
                .delete("/unlink/mfa", { data: request })
                .then(_ => resolve())
                .catch(({ response }) => reject(response.data as ApiError));
        })
    };
}