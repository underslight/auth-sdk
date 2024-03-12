import { ApiClient } from "./client";
import { AuthMethod } from "./methods";
import { User } from "./user";

export interface Config {
    id: string,
    name?: string,
    domain: string,
}

export class UnderslightAuth {
    private config: Config;
    readonly client: ApiClient;

    constructor (config: Config) {
        this.config = config;
        this.client = new ApiClient(this.config);
    }

    authenticate(credential: AuthMethod): Promise<User> {
        return credential.authenticate(this.client);
    }

    register(credential: AuthMethod): Promise<User> {
        return credential.register(this.client);
    }
}
