import {ApiKeyEntity} from "../entities/apiKey.entity";

declare global {
    namespace Express {
        interface Request {
            apiKeyEntity?: ApiKeyEntity
        }
    }
}