import { ApiClient, ApiError } from "./client";
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

    currentUser(strict?: boolean): Promise<User | null> {
        return new Promise(async (resolve, reject) => {
            if (strict) {

                // Sends the API request
                this.client
                    .client
                    .get("/current")
                    .then(({ data }) => resolve(new User(data.user)))
                    .catch(({ response }) => reject(response.data as ApiError));
            }
        });
    }

    authenticate(credential: AuthMethod): Promise<User> {
        return credential.authenticate(this.client);
    }

    register(credential: AuthMethod): Promise<User> {
        return credential.register(this.client);
    }
}
