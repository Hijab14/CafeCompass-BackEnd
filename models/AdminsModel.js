import {Schema, model} from 'mongoose';

const adminsschema = new Schema({
    eventName: { type : String, required : true},
    website: { type : String, required : true},
    facebook: { type : String},
    linkedin: { type : String},
    instagram: { type : String},
    organizer: { type : String, required : true},
    description: { type : String, required : true},
    contactNum: { type : String, required : true},
    location:{ type : String, required : true},
    date: { type : String, required : true},
    image: { data: Buffer, contentType: String },
    isApproved: {type: Boolean, required: true},
});
const Admin = model('Admin', adminsschema);
Admin.createIndexes();



export default Admin;