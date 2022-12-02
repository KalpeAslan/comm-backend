import {PassportStrategy} from "@nestjs/passport";
import {Inject, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthHelper} from "../helpers/auth.helper";
import {UserEntity} from "../../entities/user.entity";
import {authConfig} from "../../configs/auth.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    constructor(@Inject(ConfigService) config: ConfigService) {

        const secretKey = authConfig().jwtSecretKey

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretKey,
            ignoreExpiration: true,
        });
    }

    private validate(payload: string): Promise<UserEntity | never> {
        return this.helper.validateUser(payload);
    }
}