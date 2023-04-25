import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Request} from "express";
import {ConfigService} from "@nestjs/config";
import {UsersService} from "../../users/users.service";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        configService: ConfigService,
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('auth').jwtSecretKey,
            passReqToCallback: true,
        });
    }

    validate(req: Request) {
        console.log('RefreshTokenStrategy')
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return this.userService.findByRefreshToken(refreshToken)
    }
}