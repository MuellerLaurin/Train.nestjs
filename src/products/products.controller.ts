import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { SubscriptionLog } from "rxjs/internal/testing/SubscriptionLog";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }


    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const generatedId = await this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
        );

        return { id: generatedId };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products;
        //return the object
        //return {products: this.productsService.getProducts()]};
    }

    //Param is added in first line for this
    //TODO async and awayit
    @Get(':id')
    async getProduct(
        @Param('id') prodId: string,
    ) {
        const product = await this.productsService.getSingleProduct(prodId);
        return product;

    }

    @Patch(':id') //Merge (for replace @Put())
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async removeProduct(
        @Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }

}