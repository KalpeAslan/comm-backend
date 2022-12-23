import {HttpException, Injectable} from '@nestjs/common';
import {UserEntity} from "../../entities/user.entity";
import {AddressEntity} from "../../entities/addresses.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ENetwork} from "../../constants/common.constants";

@Injectable()
export class WalletService {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressesEntityRepository: Repository<AddressEntity>
    ) {
    }

    async findWalletByUserId(userId: number) {
        return this.addressesEntityRepository.findOne({
            user: {
                id: userId
            }
        })
    }

    async findOrCreateAddressEntityByEthAddress(walletAddress: string, network: ENetwork): Promise<AddressEntity> {
        walletAddress = walletAddress.toLowerCase()
        const user = await this.addressesEntityRepository.findOne({walletAddress})
        if (user) return user

        return this.addressesEntityRepository.save({
            walletAddress: walletAddress.toLowerCase(),
            network
        })
    }

    async findOrCreateAddressByUserAndEthAddress(user: UserEntity, walletAddress: string, network: ENetwork): Promise<AddressEntity> {

        walletAddress = walletAddress.toLowerCase()

        const wallet = await this.addressesEntityRepository.findOne({
            where: {
                walletAddress
            },
            join: {
                alias: 'a',
                leftJoinAndSelect: {
                    user: 'a.user'
                }
            }
        })

        if(!wallet) {
            return this.addressesEntityRepository.save({
                walletAddress: walletAddress.toLowerCase(),
                network,
                user: user
            })
        }

        if(!wallet.user) {
            console.log('NO USER')
            return this.addressesEntityRepository.save({
                ...wallet,
                walletAddress,
                user
            }, )
        }

        //
        // if(wallet.user.id !== user.id) throw new HttpException({
        //     message: 'This eth address is not yours!'
        // }, 409)

        return wallet
    }

    async saveWalletAddress(user: UserEntity, walletAddress: string) {
        const wallet = await this.addressesEntityRepository.findOne({walletAddress})
        if (wallet) throw new HttpException({
            message: 'Wallet with same address exist'
        }, 409)

        return this.addressesEntityRepository.save({
            walletAddress,
            user: user,
            network: ENetwork.Goerli
        })
    }

    findUserByWalletAddress(walletAddress: string) {
        return this.addressesEntityRepository.findOne({
            where: {walletAddress},
            join: {
                alias: 'a',
                leftJoinAndSelect: {
                    user: 'a.user'
                }
            }
        })
    }

}
