import {applyDecorators, UseGuards} from "@nestjs/common";
import {AccessTokenGuard} from '../guards/accessToken.guard';
import {EFirewall} from "../auth.constants";
import {RefreshTokenGuard} from "../guards/refreshToken.guard";
import {ApiKeyGuardGuard} from "../guards/apiKeyGuard.guard";

export function Firewall(type?: EFirewall) {

  let guard

  switch (type) {
    case EFirewall.refresh:
      guard = RefreshTokenGuard
      break
    case EFirewall.apiKey:
      guard = ApiKeyGuardGuard
      break
    default:
      guard = AccessTokenGuard
  }
  return applyDecorators(
    UseGuards(guard)
  )
}