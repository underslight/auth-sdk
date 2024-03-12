import axios, { AxiosInstance } from "axios";
import { Config } from "./auth";

export enum ApiErrorCode {
    UserNotFound = "USER_NOT_FOUND",
    UserDisabled = "USER_DISABLED",
    HashFailed = "HASH_FAILED",
    CredentialDuplicate = "CREDENTIAL_DUPLICATE",
    CredentialOnly = "CREDENTIAL_ONLY",
    CredentialNotFound = "CREDENTIAL_NOT_FOUND",
    MfaRequired = "MFA_REQUIRED",
    Io = "IO",
    SaveFailed = "SAVE_FAILED",
    UpdateFailed = "UPDATE_FAILED",
    TokenExpired = "TOKEN_EXPIRED",
    TokenInvalid = "TOKEN_INVALID",
    DatabaseFailed = "DATABASE_OP_FAILED",
    Unknown = "UNKNOWN",
}

export interface ApiError {
    readonly message: string,
    readonly code: ApiErrorCode,
}

export class ApiClient {
    readonly client: AxiosInstance;

    constructor(config: Config) {
        this.client = axios.create({
            withCredentials: true,
            baseURL: config.domain,
        });
    }
}