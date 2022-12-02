import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { UniswapController } from './uniswap/uniswap.controller';
import { UniswapService } from './uniswap/uniswap.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    CommonModule
  ],
  providers: [BlockchainService, UniswapService],
  controllers: [UniswapController]
})
export class BlockchainModule { }
