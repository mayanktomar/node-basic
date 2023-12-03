import jwt from 'jsonwebtoken';
import { constants } from './constants.js';

export const authenticate = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token,constants.secretKey);

        next();
    } catch (err) {
        console.log("err",err);
        res.status(401).send("Authorization failed.");
    }
}