import { applyDecorators, UseGuards} from "@nestjs/common";
import { AccessTokenGuard } from '../guards/accessToken.guard';

export function Firewall() {
  return applyDecorators(
    UseGuards(AccessTokenGuard)
  )
}