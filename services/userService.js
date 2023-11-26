import { Users } from "../models/UserModel.js";
import bcrypt from 'bcrypt';

export const createUser = async (userData) => {
    try {
        let password = userData.password;
        let passwordToStoreInDb = await bcrypt.hash(password,10);
        userData["password"] = passwordToStoreInDb;
        let createdUser = await Users.insertMany([userData]);
        return createdUser;
    } catch (err) {
        console.log("Error",err);
        throw err;
    }
}

export const getAllUsers = async() => {
    try {
        let allUsers = await Users.find({},{password:0}); //TODO pagination
        return allUsers;
    } catch (err) {
        console.log("err",err);
        throw err;
    }
}

export const getUserById = async (id) => {
    try {
        let userDetail = await Users.findById(id,{password:0});
        return userDetail;
    } catch (err) {
        console.log("err",err);
        throw err;
    }
}

export const updateUser = async (id,data) => {
    try {
        // data: {
        //     "name":"modifiedName",
        //     "age":30
        // }
        let updatedUser = await Users.updateOne({_id:id},{$set:data});
        return updatedUser;
    } catch (err) {
        console.log("err",err);
        throw err;
    }
}

export const deleteUser = async (id) => {
    try {
        await Users.deleteOne({_id:id});
        return true;
    } catch (err) {
        console.log("err",err);
        throw err;
    }
}

