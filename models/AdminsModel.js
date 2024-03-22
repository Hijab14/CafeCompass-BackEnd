import {Schema, model} from 'mongoose';

const adminsschema = new Schema({
    firstName: { type : String, required : true},
    lastName: { type : String, required : true},
    email: { type : String, required : true},
    cafeName: { type : String, required : true},
    location:{ type : String, required : true},
    Password: { type : String, required : true},
});
const Admin = model('Admin', adminsschema);
Admin.createIndexes();



export default Admin;