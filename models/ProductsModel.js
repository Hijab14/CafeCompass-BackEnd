import {Schema, model} from 'mongoose';

const productssschema = new Schema({
    productName: { type : String, required : true},
    quantity: { type : Number, required : true},
    price: { type : Number, required : true},
    cafeName: { type : String, required : true},
    category: { type : String, required : true},
    location: {type : String, required : true},
    imageURL:{type: String},
});
const Product = model('Product', productssschema);
Product.createIndexes();



export default Product;