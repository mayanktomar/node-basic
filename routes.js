import express from 'express';
import { createUserHandler, deleteUserHandler, getAllUsersHandler, getUserbByIdHandler, updateUserHandler } from './controllers/userControllers.js';

const router = express.Router();

router.post('/createUser',createUserHandler);
router.get('/getAllUsers',getAllUsersHandler);
router.get('/getUserById/:id',getUserbByIdHandler);
router.put('/updateUser/:id',updateUserHandler);
router.delete('/deleteUser/:id',deleteUserHandler);

export {router as routes};