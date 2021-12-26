import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule, 
    MongooseModule.forRoot('mongodb+srv://app_user_1:uugoYPe3wAdpA5wU@cluster0.njalx.mongodb.net/nestjsdemo?retryWrites=true&w=majority',
  ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
