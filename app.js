import express, { json } from 'express';
import mongoose from 'mongoose';
import { routes } from './routes.js';

const app = express();

app.use(express.json());

const databaseUrl = "mongodb+srv://mayanktomar1607:gW10YpKnlp6MXoNo@cluster0.jnw4syn.mongodb.net/ecommerce";
mongoose.connect(databaseUrl);
let database = mongoose.connection;

//Async
database.on('connected',()=>{
    console.log("Database connected successfully.");

    app.use(routes);
    app.get('/healthcheck',(req,res)=>{
        // console.log(req.body);
        console.log("Server is running");
        res.send('Server is up and running!');
    })

    app.listen(5000,()=>{
        console.log("Server is running on port 5000");
    });
});

database.on('error',(err)=>{
    console.log("Error while connecting to database...",err);
})





//http://locahost:5000/healthcheck - GET

//mongodb+srv://mayanktomar1607:gW10YpKnlp6MXoNo@cluster0.jnw4syn.mongodb.net/