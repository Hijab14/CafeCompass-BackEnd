import {Schema, model} from 'mongoose';

const orderschema = new Schema({
    userEmail: { type : String, required : true},
    date: { type : String, required : true},
    cafeName: { type : String, required : true},
    total: { type : Number, required : true},
    items: [{
        productName: { type : String, required : true},
        userQuantity: { type : String, required : true},
        price: { type : String, required : true},
        category: { type : String, required : true},
    }],
    status:{ type : String, required : true}
});
const Order = model('Order', orderschema);
Order.createIndexes();



export default Order;