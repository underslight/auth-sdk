import { ApiClient, ApiError } from "src/client";
import { User } from "src/user";
import { AuthMethodType, AuthMethod, MfaCode } from ".";

export class EmailPasswordMethod implements AuthMethod {
    readonly type = AuthMethodType.EmailPassword;
    mfa_code?: MfaCode;

    private email: string;
    private password: string;

    constructor(email: string, password: string, mfa_code?: MfaCode) {
        this.email = email;
        this.password = password;
        this.mfa_code = mfa_code;
    }

    setMfaCode(mfa_code?: MfaCode) {
        this.mfa_code = mfa_code;
    }

    authenticate (client: ApiClient, successRedirect?: string): Promise<User> {
        return new Promise(async (resolve, reject) => {

            // Forms the request
            const request = {
                email: this.email,
                password: this.password,
                mfa_code: this.mfa_code,
            };

            // Sends the API request
            await client 
                .client
                .post(`/authenticate/${ this.type }`, request)
                .then(({ data }) => {
                    
                    if (successRedirect && typeof window !== "undefined")
                        window.location.href = successRedirect;

                    resolve(new User(data.user));
                })
                .catch(({ response }) => reject( response.data as ApiError))
        }); 
    }

    register (client: ApiClient, successRedirect?: string): Promise<User> {
        return new Promise(async (resolve, reject) => {

            // Forms the request
            const request = {
                email: this.email,
                password: this.password,
            };

            // Sends the API request
            await client 
                .client
                .post(`/register/${ this.type }`, request)
                .then(({ data }) => {

                    if (successRedirect && typeof window !== "undefined")
                        window.location.href = successRedirect;
                    
                    resolve(new User(data.user));
                })
                .catch(({ response }) => reject( response.data as ApiError))
        }); 
    }

    link(client: ApiClient): Promise<void> {
        return new Promise(async (resolve, reject) => {

            // Forms the request
            const request = {
                email: this.email,
                password: this.password
            };

            // Sends the API request
            await client 
                .client
                .post(`/link/${ this.type }`, request)
                .then(_ => resolve())
                .catch(({ response }) => reject(response.data as ApiError));
        })
    };

    unlink(client: ApiClient): Promise<void> {
        return new Promise(async (resolve, reject) => {

            // Forms the request
            const request = {
                auth_method: this.type,
            };

            // Sends the API request
            await client 
                .client
                .delete("/unlink/auth", { data: request })
                .then(_ => resolve())
                .catch(({ response }) => reject(response.data as ApiError));
        })
    };
}