// Importing module
import express from 'express';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

mongoose.set('strictQuery', false);

const app = express();

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();

}
const PORT = process.env.PORT || 3000;

// Handling GET / Request
app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!!!');
})

// Handling POST /users Request

const user = new User({
    name: 'Testing User',
    email: 'testing.user@gmail.com',
    password: 'password'

});

app.get('/users', async (req, res) => {
    res.send(user);
});

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