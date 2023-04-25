import {CanActivate, ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {StoreService} from "../../store/store.service";
import {Request} from "express";
import {xCommApiKey} from "../../constants/common.constants";

@Injectable()
export class ApiKeyGuardGuard implements CanActivate {

    constructor(
        @Inject(StoreService)
        private readonly storeService: StoreService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = await context.switchToHttp().getRequest() as Request
        const apiKeyEntity = await this.storeService.findApiKey(req.headers[xCommApiKey] as string)
        req.apiKeyEntity = apiKeyEntity
        return !!apiKeyEntity
    }
}