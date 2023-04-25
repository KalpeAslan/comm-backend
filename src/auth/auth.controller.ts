import {Body, Controller, Patch, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {RegisterEmailDto} from "./dto/register-email.dto";
import {RefreshTokenDto} from './dto/refresh-token.dto'
import {VerifyCodeDto} from './dto/verify-code.dto';
import {SsoSignUpDto} from "./dto/sso-sign-up.dto";
import {EFirewall, ESsoTypes} from "./auth.constants";
import {Firewall} from "./decorators/firewall.decorator";
import {UserEntity} from "../entities/user.entity";
import {User} from "./decorators/user.decorator";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {
    }


    @Post('/sign-up')
    async signUp(
        @Body() body: RegisterEmailDto
    ) {
        return this.authService.registerByEmail(body)
    }

    @Post('/sso-sign-up')
    async ssoSignUp(
        @Body() body: SsoSignUpDto
    ) {
        switch (body.type) {
            case ESsoTypes.GOOGLE:
                return this.authService.googleSsoSignUp(body)
        }
    }

    @Post('/sign-in')
    async signIn(
        @Body() body: LoginDto
    ) {
        return this.authService.login(body)
    }


    @Patch('/mail/verify')
    async verifyMail(
        @Body() body: VerifyCodeDto
    ) {
        await this.authService.confirmEmail(body)
        return {
            message: 'Message is confirmed',
            status: 200
        }
    }


    @Firewall(EFirewall.refresh)
    @Post('/refresh')
    async refresh(
        @Body() body: RefreshTokenDto,
        @User() user: UserEntity
    ) {
        return await this.authService.refreshAndSaveTokens(user)
    }

}
