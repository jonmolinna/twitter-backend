import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import rutas from './rutas/rutas.js';



// App Config
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Config
const mongoURI = "mongodb://localhost/twitter";
mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
    console.log('DB Connected');
});

// Rutas
app.get('/', (req, res) => res.status(200).json({ msg: 'I message Backend' }));
app.use('/api/message', rutas);

// Listen
app.listen(port, () => console.log(`Listening on Localhost: http://localhost:${port}`));