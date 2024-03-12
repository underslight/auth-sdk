import { UnderslightAuth } from "./auth";
import { ApiError } from "./client";
import { AuthMethod, MfaMethod } from "./methods";

export interface UserAttributes {
    custom: {
        [prop: string]: any;
    },
}

export interface UserMetadata {
    readonly disabled: string[] | null,
    readonly verified: boolean,
    readonly last_access: number,
    readonly last_password_reset: number,
}

export interface UserData {
    readonly id: string,
    attributes: UserAttributes;
    readonly metadata: UserMetadata;
}

export class User {
    readonly id: string;
    attributes: UserAttributes;
    readonly metadata: UserMetadata;

    constructor({ id, attributes, metadata }: UserData) {
        this.id = id;
        this.attributes = attributes;
        this.metadata = metadata;
    }

    linkAuthMethod(auth: UnderslightAuth, auth_method: AuthMethod): Promise<User> {
        return new Promise(async (resolve, reject) => {
            await auth_method
                .link(auth.client)
                .then(_ => resolve(this))
                .catch(error => reject(error))
        });
    } 

    unlinkAuthMethod(auth: UnderslightAuth, auth_method: AuthMethod): Promise<User> {
        return new Promise(async (resolve, reject) => {
            await auth_method
                .unlink(auth.client)
                .then(_ => resolve(this))
                .catch(error => reject(error))
        });
    }

    linkMfaMethod(auth: UnderslightAuth, mfa_method: MfaMethod): Promise<User> {
        return new Promise(async (resolve, reject) => {
            await mfa_method
                .link(auth.client)
                .then(_ => resolve(this))
                .catch(error => reject(error))
        });
    }

    unlinkMfaMethod(auth: UnderslightAuth, mfa_method: MfaMethod): Promise<User> {
        return new Promise(async (resolve, reject) => {
            await mfa_method
                .unlink(auth.client)
                .then(_ => resolve(this))
                .catch(error => reject(error))
        });
    }

    delete(auth: UnderslightAuth): Promise<void> {
        return new Promise(async (resolve, reject) => {

            // Sends the API request
            await auth.client
                .client
                .delete("/delete")
                .then(_ => resolve())
                .catch(({ response }) => reject(response.data as ApiError));
        })
    }

    update(auth: UnderslightAuth): Promise<User> {
        return new Promise(async (resolve, reject) => {

            // Sends the API request
            await auth.client 
                .client 
                .put("/update", this.attributes)
                .then(_ => resolve(this))
                .catch(({ response }) => reject(response.data as ApiError));
        });
    }
}