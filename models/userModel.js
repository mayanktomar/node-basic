import mongoose from 'mongoose';

//creation of schema
//Contraints - required, unique, default
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 25
    },
    gender: {
        type:String
    }
});

const Users = mongoose.model('users',userSchema);
export {Users};
