import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    // no public possibel: this is a java scripot object literal
    //String is uppercase as it is no typescript type but a JS Type
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});



export interface Product extends mongoose.Document {
    //TODO: read check interface vs class

    id: string;
    title: string;
    description: string;
    price: number;
}

// export class Product {
//     constructor(
//         public id: string, 
//         public title: string, 
//         public description: string, 
//         public price: number,
//         ) {}
// }
