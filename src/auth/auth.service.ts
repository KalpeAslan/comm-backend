import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from "../entities/user.entity";
import { authConfig } from "../configs/auth.config";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthHelper } from "./helpers/auth.helper";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { UsersService } from "../users/users.service";
import { IAuthConfig } from "../ts/auth.types";
import { RegisterEmailDto } from "./dto/register-email.dto";
import { CommunicationService } from '../communication/communication.service';
import { EMessageTypes } from 'src/communication/constants/communication.constants';
import { VerifyCodeDto } from './dto/verify-code.dto';


@Injectable()
export class AuthService {

    private readonly config: IAuthConfig

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly helper: AuthHelper,
        private readonly userService: UsersService,
        private readonly communicationService: CommunicationService
    ) {
        this.config = authConfig()
    }


    //Register
    public async registerByEmail(body: RegisterEmailDto): Promise<any> {
        const { email, password }: RegisterEmailDto = body;
        let user: UserEntity = await this.usersRepository.findOne({ where: {  email } });

        if (user) {
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }

        user = new UserEntity();

        user.email = email.toLowerCase();
        user.password = this.helper.encodePassword(password);

        await this.usersRepository.save(user);
        await this.communicationService.sendSignUpMessage(user, EMessageTypes.Email)
        return user;
    }

    public async login(body: LoginDto): Promise<any> {
        const { email, password } = body;
        const user: UserEntity = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

        if (!isPasswordValid) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        if (!user.confirmed) {
            await this.communicationService.sendSignUpMessage(user, EMessageTypes.Email)
            throw new HttpException('Confirm Your Account', 425);
        }

        return this.refreshAndSaveTokens(user)
    }


    //Confirm



    public async confirmEmail(body: VerifyCodeDto) {
        const confirmedMessageUser = await this.communicationService.confirmCodeMessage(+body.code)

        await this.usersRepository.update(
            { id: confirmedMessageUser.id },
            { confirmed: true }
        )
    }

    //Tokens

    public async refreshAndSaveTokens(user: UserEntity): Promise<any> {
        const tokens = await this.helper.generateTokens(user);

        await this.usersRepository.update({
            id: user.id
        },
            {
                refresh_token: tokens.refreshToken
            })
        return tokens
    }
}
