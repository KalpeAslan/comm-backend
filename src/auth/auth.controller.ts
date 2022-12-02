import { Body, Controller,Post, HttpException, Patch } from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {RegisterEmailDto} from "./dto/register-email.dto";
import {RefreshTokenDto} from './dto/refresh-token.dto'
import { UsersService } from 'src/users/users.service';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {
    }


    @Post('/sign-up')
    async signUp(
        @Body() body: RegisterEmailDto
    ) {
        return this.authService.registerByEmail(body)
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


    @Post('/refresh')
    async refresh(
        @Body() body: RefreshTokenDto
    ) {
        const user = await this.usersService.findByRefreshToken(body.refreshToken)

        if(!user) throw new HttpException({
            message: 'Invalid refresh Token'
        }, 401)


        return await this.authService.refreshAndSaveTokens(user)
    }

}
