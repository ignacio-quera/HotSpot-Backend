// Importing module
import express from 'express';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
import { routes } from './routes';

const verifyToken = require('./helpers/validate-token');
const app = express();

mongoose.set('strictQuery', false);


if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
    
}
const PORT = process.env.PORT || 3000;

// Usar las rutas
app.use(express.json());
app.use('/', routes);

// Handling GET / Request
app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!!!');
})

// Server setup

const start = async () => {
    try{ 

        await mongoose.connect(process.env.CONNECTION_MONGO);

        app.listen(PORT,() => {
            console.log('The application is listening '
                + 'on port http://localhost:'+PORT);
        });
    } catch(error){
        console.log('Error:',error);
    }
}

start();