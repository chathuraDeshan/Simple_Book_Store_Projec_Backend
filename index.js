import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from './bookRoute.js'
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
app.use(cors());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('welcome To MERN Stack Tutorial')
});

app.use('/books',bookRoute);


mongoose.connect(mongoDBURL)
    .then(() =>{
        console.log('App is connected by database')
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
        
    })
    .catch((error)=>{
        console.error(error);
    });

    