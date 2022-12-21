import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {AddProductDto} from "./dto/add-product.dto";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "./utils/file-upload.utils";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../entities/user.entity";
import {User} from "../users/decorators/user.decorator";
import {Firewall} from "../auth/decorators/firewall.decorator";



@Controller('products')
export class ProductsController {

    constructor(
        private readonly productsService: ProductsService
    ) {
    }

    @Firewall()
    @Post('/add')
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
        @User() user: UserEntity
    ) {
        body.files = JSON.stringify(files ? [files.path] : [])
        return this.productsService.addProduct(user, body)
    }

    @Firewall()
    @Get('/my')
    async getAllAddressProducts(
        @Param('ethAddress') ethAddress: string,
        @User() user: UserEntity
    ) {
        return this.productsService.getUserProducts(user.id)
    }

    @Get('')
    async getAllProducts() {
        return this.productsService.getAllProducts()
    }

    @Firewall()
    @Get('/:id')
    async getProductById(
        @Param('id') id: string
    ) {
        return this.productsService.getProductById(id)
    }



}
