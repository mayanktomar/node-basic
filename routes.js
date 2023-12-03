import express from 'express';
import { createUserHandler, deleteUserHandler, getAllUsersHandler, getUserbByIdHandler, loginUserHandler, refreshTokenHandler, updateUserHandler } from './controllers/userControllers.js';
import { authenticate } from './authenticate.js';

const router = express.Router();

router.post('/createUser',createUserHandler);
router.get('/getAllUsers',authenticate,getAllUsersHandler);
router.get('/getUserById/:id',authenticate,getUserbByIdHandler);
router.put('/updateUser/:id',authenticate,updateUserHandler);
router.delete('/deleteUser/:id',authenticate,deleteUserHandler);

router.post('/loginUser',loginUserHandler);
router.post('/refreshToken',authenticate,refreshTokenHandler);

export {router as routes};