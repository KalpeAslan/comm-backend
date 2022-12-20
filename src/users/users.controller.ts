import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    ParseIntPipe, Patch, Post,
    Put,
    Query,
    Res,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {Response} from "express";
import {UserEntity} from "../entities/user.entity";
import {User} from "./decorators/user.decorator";
import {Firewall} from "src/auth/decorators/firewall.decorator";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../products/utils/file-upload.utils";
import {UpdateUserDto} from "../dto/updateUser.dto";
import {ChangePasswordDto} from "./dto/change-password.dto";


@Controller("/users")
export class UsersController {

    constructor(
        private readonly userService: UsersService,
    ) {
    }


    @Firewall()
    @Get('/me')
    getMe(@User() user: UserEntity) {
        return user
    }

    @Firewall()
    @Put('/verification')
    @UseInterceptors(FileInterceptor('photo', {
        storage: diskStorage({
            destination: 'assets/passport',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    saveVerification(
        @UploadedFile() files: Express.Multer.File,
        @Body() body: UpdateUserDto,
        @User() user: UserEntity
    ) {
        body.photo = JSON.stringify(files ? files.path : [])
        return this.userService.saveVerification(user, body)
    }


    @Firewall()
    @Patch('/changePassword')
    changePassword(
        @User() user: UserEntity,
        @Body() body: ChangePasswordDto
    ) {
        return this.userService.changePassword(user, body)
    }


    @Get("/")
    async getUsers(
        @Res() response: Response,
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
    ): Promise<Response<UserEntity[]>> {

        const users = await this.userService.getUsers({page, limit});
        return response.send({
            message: users,
            status: 200
        }).status(200);
    }
}
