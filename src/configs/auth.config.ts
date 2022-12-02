import {IAuthConfig} from "../ts/auth.types";
import {Env} from "../utils/env.utils";

export function authConfig(): IAuthConfig {
    return {
        jwtSecretKey: Env.readString('JWT_SECRET_KEY'),
        jwtTokenTtl: Env.readString('JWT_TOKEN_TTL')
    }
}