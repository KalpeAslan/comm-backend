import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { UniswapService } from './uniswap.service';

@Controller('uniswap')
export class UniswapController {

  constructor(
    private readonly uniswapProvider: UniswapService
  ) {

  }


  @Get('/token/swap-amount')
    public async getTokens(
        @Query('tokenAmountFrom', new DefaultValuePipe(undefined)) tokenAmountFrom: number,
        @Query('tokenFrom', new DefaultValuePipe(undefined)) tokenFrom: string,
        @Query('tokenTo', new DefaultValuePipe(undefined)) tokenTo: string,

    ) {
        return this.uniswapProvider.calculatePrice("goerli", tokenAmountFrom, tokenFrom, tokenTo);
    }
}
