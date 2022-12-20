import {Body, Controller, Get, Post} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {StoreService} from "./store.service";
import {UserEntity} from "../entities/user.entity";
import {User} from "../users/decorators/user.decorator";
import {Firewall} from "../auth/decorators/firewall.decorator";
import {SaveStoreDto} from "./dto/save-store.dto";
import {CreateApiKeyDto} from "./dto/createApiKey.dto";

@Controller("/api/v1/store")
export class StoreController {

    constructor(
        private readonly userService: UsersService,
        private readonly storeService: StoreService
    ) {
    }

    @Firewall()
    @Get('/apiKeys')
    getApiKeys(
        @User() user: UserEntity,
    ) {
        return this.storeService.getApiKeys(user)
    }

    @Firewall()
    @Post('/saveStore')
    saveStore(
        @User() user: UserEntity,
        @Body() body: SaveStoreDto
    ) {
        return this.storeService.saveStore(user, body)
    }

    @Firewall()
    @Post('/createApiKey')
    createApiKey(
        @User() user: UserEntity,
        @Body() dto: CreateApiKeyDto
    ) {
        return this.storeService.createApiKey(user, dto)
    }
}
