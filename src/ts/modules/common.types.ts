export interface IIsPrivateKeyExist {
  storeId: number
  privateKey: string
}

export interface IProduct {
  img: string
  name: string
  price: string | number
  currency: string
  productId: number
}
