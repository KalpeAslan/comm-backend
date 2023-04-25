import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {Request} from "express";
import {ApiKeyEntity} from "../../entities/apiKey.entity";

export const ApiKeyDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): ApiKeyEntity => {
        const request = ctx.switchToHttp().getRequest() as Request;
        return request.apiKeyEntity;
    },
);
