import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model'
import { ProductsModule } from "./products.module";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) { }

    async insertProduct(title: string, desc: string, price: number) {
        //TODO read about async and await (.then)
        //const prodId = Math.random().toString();
        //TODO Check about Promise
        const newProduct = new this.productModel({
            title, // the same as title: title when name is identical
            description: desc,
            price: price,
        });
        const result = await newProduct.save();  //same as .then
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        // TODO what is exec (why it is needed) - gives you a real promise

        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price,
        }));
        // or return this.products.slice -> is the same
        // return a copy ([...xxxx]) as products array is a reference type and is a pointer -> this would allow to manipluate the products outside in the controler
        // products are objects -> no need to copy. With this.products.map -> copy created
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);

        return {
            id: product.id,
            description: product.description,
            title: product.title,
            price: product.price,
        };
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId);



        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }

    async deleteProduct(productId: string) {

        const result = await this.productModel.deleteOne({ _id: productId }).exec();
        ///TODO: == vs ===
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find Product - DELETE')
        }
        console.log(result);
    }

    private async findProduct(pid: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(pid);
        } catch (error) {
            throw new NotFoundException('No valid ID: Could not find product.');
        }
        if (!product) {
            throw new NotFoundException('Not in DB: Could not find product.');
        }
        return product;
    }



}
