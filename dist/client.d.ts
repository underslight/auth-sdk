import { AxiosInstance } from "axios";
import { Config } from "./auth";
export declare enum ApiErrorCode {
    UserNotFound = "USER_NOT_FOUND"
}
export interface ApiError {
    readonly message: string;
    readonly code: ApiErrorCode;
}
export declare class ApiClient {
    readonly client: AxiosInstance;
    constructor(config: Config);
}
