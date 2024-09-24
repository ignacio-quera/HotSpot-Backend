// Importing module
import express from 'express';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');
const app = express();

mongoose.set('strictQuery', false);


if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
    
}
const PORT = process.env.PORT || 3000;

// Usar las rutas
app.use(express.json());
app.use('/api/user', registerRoutes);  // Ruta para registro
app.use('/api/user', loginRoutes);     // Ruta para login

// Middlewares
app.use('/api/dashboard', verifyToken, dashboadRoutes);


// Handling GET / Request
app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!!!');
})

// Server setup

const start = async () => {
    try{ 

        // await mongoose.connect(process.env.CONNECTION_MONGO);

        app.listen(PORT,() => {
            console.log('The application is listening '
                + 'on port http://localhost:'+PORT);
        });
    } catch(error){
        console.log('Error:',error);
    }
}

start();