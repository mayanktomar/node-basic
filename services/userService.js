import { Users } from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { constants } from "../constants.js";


const sercretKey = constants.secretKey;
export const loginUser = async (userData) => {
    // userData = {
    //     username: 'testuser1',
    //     password: 'abc@123'
    // }
    try {
        const emailId = userData.email;
        const passwordByUser = userData.password; //abc@123
        console.log("emailId",emailId);
        const userDocument = await Users.findOne({email:emailId});
        //userDocument -> null
        //null -> false
        //!null -> true
        if (!userDocument) {
            return ({status:'error',message:'user does not exist'});
        }
        const hashedPassword = userDocument.password; //hdahfuwhfiewu@8ue983jdueuq8u
        const match = await bcrypt.compare(passwordByUser,hashedPassword);

        if (!match) {
            return ({status:'error',message:'password does not match'});
        }

        const payloadForAccessToken = {
            name:userDocument.name,
            email:userDocument.email,
            age:userDocument.age,
            gender:userDocument.gender
        }

        const payloadForRefreshToken = {
            id: userDocument._id
        }

        const accessToken = jwt.sign(payloadForAccessToken,sercretKey,{expiresIn:'1m'});
        const refreshToken  = jwt.sign(payloadForRefreshToken,sercretKey,{expiresIn:'3m'});

        return ({status:'success',data:{accessToken,refreshToken}});

    } catch {
        console.log("err",err);
        throw err;
    }
}

export const refreshToken = async (tokens) => {
    try {
        let accessToken = tokens.accessToken;
        let refreshToken = tokens.refreshToken;

        //Check if the refresh token is expired and is valid(signed using the same secret key).
        let decodedToken = jwt.verify(refreshToken,sercretKey);
        
        let decodedAccessToken = jwt.verify(accessToken,sercretKey);

        let newExpiry = (new Date()/1000) + 60;
        console.log("new expiry",newExpiry);
        decodedAccessToken.exp = newExpiry;
        let newAccessToken = await jwt.sign(decodedAccessToken,sercretKey);

        return {
            accessToken: newAccessToken,
            refreshToken: refreshToken
        }

    } catch (err) {
        console.log('err',err);
        throw err;
    }
}
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

