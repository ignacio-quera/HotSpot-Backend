// Importing module
import express from 'express';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');
const eventRoutes = require('./routes/events/routes');
const locationRoutes = require('./routes/locations/routes');

const app = express();
app.use(cors());

mongoose.set('strictQuery', false);


if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
    
}
const PORT = process.env.PORT || 3000;

// Usar las rutas
app.use(express.json());

// Ruta para registro
app.use('/api/user', registerRoutes);  

// Ruta para login
app.use('/api/user', loginRoutes);     

// Ruta para eventos
app.use('/api/events', eventRoutes);

// Ruta para locales
app.use('/api/locations', locationRoutes);

// Middlewares
app.use('/api/dashboard', verifyToken, dashboadRoutes);


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