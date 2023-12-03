import { createUser, deleteUser, getAllUsers, getUserById, loginUser, refreshToken, updateUser } from "../services/userService.js";

export const createUserHandler = async(req,res) => {
    let userData = req.body;
    try {
        let createdUser = await createUser(userData);
        res.send({message:'user created successfully',data:createdUser});
    } catch (err) {
        res.status(500).send({message:'user creation failed.'});
    }   
}

export const getAllUsersHandler = async(req,res) => {
    try {
        let allUsers = await getAllUsers();
        res.send({message:'users fetched successfully',data:allUsers});
    } catch (err) {
        res.status(500).send({message:'user fetch failed.'});
    }
}

export const getUserbByIdHandler = async(req,res) => {
    try {
        let id = req.params.id;
        let userDetail = await getUserById(id);
        res.send({message:'user fetched successfully',data:userDetail});
    } catch (err) {
        res.status(500).send({message:'user fetch failed.'});
    }
}

export const updateUserHandler = async(req,res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let updatedUser = await updateUser(id,data);
        res.send({message:'user updated successfully',data:updatedUser});
    } catch (err) {
        res.status(500).send({message:'user update failed.'});
    }
}


export const deleteUserHandler = async(req,res) => {
    try {
        let id = req.params.id;
        await deleteUser(id);
        res.send({message:'user deleted successfully'});
    } catch (err) {
        res.status(500).send({message:'user deletion failed.'});
    }
}

export const loginUserHandler = async(req,res) => {
    try {
        const userData = req.body;
        const user = await loginUser(userData);
        if (user.status=='error') {
            res.status(401).send(user);
        } else {
            res.status(200).send(user);
        }
    } catch (err) {
        res.status(500).send({message:'error while logging in'})
    }
}

export const refreshTokenHandler = async(req,res) => {
    try {
        let tokens = req.body;
        let newTokens = await refreshToken(tokens);
        return res.status(200).send(newTokens);
    } catch (err) {
        return res.status(500).send('Error while refreshing the access token');
    }
}