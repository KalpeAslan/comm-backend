import { Injectable } from '@nestjs/common';
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

    async getUserByAddress(address: string): Promise<UserEntity | null> {
        const addressEntity: AddressEntity = await this.addressesEntityRepository.findOne({
            join: {
                alias: "address",
                leftJoinAndSelect: {
                    user: "address.user"
                }
            },
            where: {
                address
            }
        });
        if(!addressEntity) return null;
        return addressEntity.user
    }

    async findOrCreateAddressEntityByEthAddress(walletAddress: string, network: ENetwork): Promise<AddressEntity> {
        const user = await this.addressesEntityRepository.findOne({walletAddress})
        if (user) return user

        return this.addressesEntityRepository.save({
            walletAddress: walletAddress.toLowerCase(),
            network
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
