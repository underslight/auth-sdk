import { ApiClient } from "./client";
import { AuthMethod } from "./methods";
import { User } from "./user";
export interface Config {
    id: string;
    name?: string;
    domain: string;
}
export declare class UnderslightAuth {
    private config;
    readonly client: ApiClient;
    constructor(config: Config);
    authenticate(credential: AuthMethod): Promise<User>;
    register(credential: AuthMethod): Promise<User>;
}
