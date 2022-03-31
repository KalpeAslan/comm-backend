import { Injectable } from "@nestjs/common";
import crypto from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PrivateKeyEntity } from "../../../entities/privateKey.entity";
import { IIsPrivateKeyExist } from "../../../ts/modules/common.types";
import Crypto from "crypto-js";
import { StoreEntity } from "../../../entities/store.entity";
import { ProductDto } from "../../../dto/product.dto";

const exampleKey35 = "22c850aad93db742f9e11656952c08de5c542e438f8084d0422c93af084cbe55__1";

const product: ProductDto = {
  img: "asas",
  name: "aaple",
  currencySymbol: "ETH",
  productId: 12,
  additionalInfo: "asas",
  price: 12,
  currency: 'ETHER'
};

@Injectable()
export class PrivateKeyService {

  constructor(
    @InjectRepository(PrivateKeyEntity)
    private readonly privateKeysRepository: Repository<PrivateKeyEntity>
  ) {
    const { key, storeId } = this.normalizeKey(exampleKey35);
    const hash = this.encryptProductHash
    ({
      key,
      product: product
    })
    const decrypted = this.decryptHash({key, hash})
    console.log(key)
    console.log(storeId)
    console.log(hash)
    console.log(product)
    console.log(decrypted)
  }

  //Костыль временный
  public normalizeKey(rawKey: string): {
    key: string,
    storeId: number
  } {
    return {
      key: rawKey.split("__")[0],
      storeId: +rawKey.split("__")[1]
    };
  }

  private async generateHash(data: string): Promise<string> {
    return crypto
      .createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex");
  }

  private async generatePrivateKey(storeEntity: any): Promise<string> {
    return await this.generateHash(JSON.stringify(storeEntity));
  }

  public async addPrivateKey(store: StoreEntity): Promise<PrivateKeyEntity> {
    return await this.privateKeysRepository.save({
      storeId: store,
      queriesCount: 0,
      keyHash: await this.generatePrivateKey(store),
      createdAt: new Date().toString()
    });
  }


  async isPrivateKeyExist({ privateKey, storeId }: IIsPrivateKeyExist): Promise<boolean> {
    const privateKeyEntity = await this.privateKeysRepository.findOne({
      store: {
        id: storeId
      }
    });
    return privateKeyEntity ? privateKeyEntity.keyHash === privateKey : false;
  }

  encryptProductHash({ key, product }: { key: string, product: ProductDto }): string {
    const _key = Crypto.enc.Utf8.parse(key);
    const _product = Crypto.enc.Utf8.parse(JSON.stringify(product));
    const encrypted = Crypto.AES.encrypt(_product, _key, {
      mode: Crypto.mode.ECB,
      padding: Crypto.pad.Pkcs7
    });

    return encodeURIComponent(encrypted.toString())
  }

  decryptHash({ key, hash }: { key: string, hash: string }) {
    const _key = Crypto.enc.Utf8.parse(key);
    const decrypt = Crypto.AES.decrypt(decodeURIComponent(hash), _key, {
      mode: Crypto.mode.ECB,
      padding: Crypto.pad.Pkcs7
    });
    return Crypto
      .enc.Utf8.stringify(decrypt).toString().replaceAll('[sl]', '/')
  }
}
