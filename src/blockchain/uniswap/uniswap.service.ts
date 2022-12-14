import { Inject, Injectable } from "@nestjs/common";
import { ChainId, Token, WETH, Fetcher, Route, TokenAmount, TradeType, Trade, Percent, JSBI, Pair } from "@uniswap/sdk";
import ethers from 'ethers'
import { CurrencyService } from 'src/common/currencies/currency.service';

const fs = require("fs");


@Injectable()
export class UniswapService {
    private readonly generic: Token

    constructor(
        private readonly currencyService: CurrencyService
    ) {

    }

    public async calculatePrice (network: string, amount: number, tokenFrom: string, tokenTo: string) {
        try {
            const chainID = ChainId.GÖRLI

            const tokenInputInfo = await this.currencyService.getCurrencyBySymbol(tokenFrom)
            const tokenOutputInfo = await this.currencyService.getCurrencyBySymbol(tokenTo)
            const tokenOutput = new Token(chainID, tokenOutputInfo.address, +tokenOutputInfo.decimals);
            console.log('tokenOutput')
            let decimals = +tokenInputInfo.decimals
            const tokenInput = new Token(chainID, tokenInputInfo.address, decimals)
            console.log('tokenInput')
            let value = amount * 10 ** decimals
            const tokenInputAmount = new TokenAmount(tokenInput, String(value));
            const pair = await Fetcher.fetchPairData(tokenInput, tokenOutput)
            console.log('pair')
            const route = new Route([pair], tokenInput);
            const trade = new Trade(route, tokenInputAmount, TradeType.EXACT_INPUT);
            const slippageTolerance = new Percent('50', '10000');
            const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
            const amountOutMax = trade.maximumAmountIn(slippageTolerance).raw;
            
            return {
                pairAddress: Pair.getAddress(tokenInput, tokenOutput),
                trade: {
                    outputAmount: String(trade.outputAmount.raw),

                    outputAmountFormatted: String(trade.outputAmount.toSignificant(6)),
                    outputAmountInvertFormatted: String(trade.outputAmount.invert().toSignificant(6)),

                    inputAmount: String(trade.inputAmount.raw),

                    amountOutMin: String(amountOutMin),
                    amountOutMax: String(amountOutMax),

                    executionPrice: trade.executionPrice.toSignificant(6),
                    nextMidPrice: trade.nextMidPrice.toSignificant(6),
                },
                input: route.input,
                output: route.output
            }


        } catch (error) {
            console.log(error)
        }
    }




    private  readFile(tokenSymbol: string){
        try {
            console.log("link:", tokenSymbol)
            const jsonString = fs.readFileSync('/home/nurdaulet/Desktop/dexoo-token-price-api/src/Tokens/goerli_eth_token.json')
            const customer =  JSON.parse(jsonString)
            let data = {}

            for (let index of customer['tokens']) {
                let symbol = index['symbol']
                // console.log(tokenSymbol == symbol)
                // console.log(tokenSymbol.toUpperCase() == symbol, "info")
                // if("LINK" == symbol){
                //     console.log("resr")
                // }
                if (tokenSymbol.toUpperCase() == symbol) {

                    data['symbol'] = symbol;
                    data['address'] = index['address']
                    data['decimals'] = index['decimals']

                }
            }

            return {data};

        }
        catch(err) {
            console.log(err)
            return
        }
    }
}