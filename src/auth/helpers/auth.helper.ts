import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {UsersService} from "../../users/users.service";
import {authConfig} from "../../configs/auth.config";
import {IAuthConfig} from "../../ts/auth.types";

@Injectable()
export class AuthHelper {
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>;

    private readonly jwtService: JwtService;

    private readonly config: IAuthConfig

    constructor(
        jwt: JwtService,
        private readonly userService: UsersService
    ) {
        this.jwtService = jwt;
        this.config = authConfig()
    }

    public async generateTokens(user: UserEntity) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: user.id,
                },
                {
                    secret: this.config.jwtSecretKey,
                    expiresIn: '30m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: user.id,
                },
                {
                    secret: this.config.jwtSecretKey,
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    // Decoding the JWT Token
    public async decode(token: string): Promise<unknown> {
        return this.jwtService.decode(token, null);
    }

    // Get User by User ID we get from decode()
    public async validateUser(decoded: any): Promise<UserEntity> {
        return this.repository.findOne(decoded.id);
    }

    // Validate User's password
    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }


    public isRefreshTokenValid(refreshToken: string, userRefreshToken: string): boolean {
        return bcrypt.compareSync(refreshToken, userRefreshToken)
    }

    // Encode User's password
    public encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(password, salt);
    }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    private async validate(token: string): Promise<boolean | never> {
        const decoded: unknown = this.jwtService.verify(token);

        if (!decoded) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        const user: UserEntity = await this.validateUser(decoded);

        if (!user) {
            throw new UnauthorizedException();
        }

        return true;
    }



}