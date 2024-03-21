import {Schema, model} from 'mongoose';

const usersschema = new Schema({
    firstName: { type : String, required : true},
    lastName: { type : String, required : true},
    email: { type : String, required : true},
    password: { type : String, required : true},
    history: []
});
const User = model('User', usersschema);
User.createIndexes();



export default User;