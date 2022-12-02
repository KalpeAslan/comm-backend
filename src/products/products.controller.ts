import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {AddProductDto} from "./dto/add-product.dto";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "./utils/file-upload.utils";
import {UsersService} from "../users/users.service";



@Controller('products')
export class ProductsController {

    constructor(
        private readonly productsService: ProductsService,
        private readonly userService: UsersService
    ) {
    }

    @Post('/add/:ethAddress')
    @UseInterceptors(FileInterceptor('files',{
        storage: diskStorage({
            destination: 'assets/products',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    addProduct(
        @UploadedFile() files: Express.Multer.File,
        @Body() body: AddProductDto,
        @Param('ethAddress') ethAddress: string
    ) {
        body.files = JSON.stringify(files ? [files.path] : [])
        body.ethAddress = ethAddress
        return this.productsService.addProduct(body)
    }

    @Get('/my/:ethAddress')
    async getAllAddressProducts(
        @Param('ethAddress') ethAddress: string
    ) {
        const user = await this.userService.findOrCreateUserByEthAddress(ethAddress)
        return this.productsService.getUserProducts(user.id)
    }

    @Get('')
    async getAllProducts() {
        return this.productsService.getAllProducts()
    }


    @Get('/:id')
    async getProductById(
        @Param('id') id: string
    ) {
        return this.productsService.getProductById(id)
    }



}
