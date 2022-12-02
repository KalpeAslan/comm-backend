import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {ConfigService} from "@nestjs/config";
import { UsersService } from 'src/users/users.service';

type JwtPayload = {
    sub: number
    ethAddress: string
    iat: number,
    exp: number
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService 
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('auth').jwtSecretKey,
            ignoreExpiration: false,
        });

    }

    async validate(payload: JwtPayload) {
        return await this.usersService.findOrCreateUserByEthAddress(payload.ethAddress);
    }
}