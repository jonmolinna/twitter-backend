import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import Pusher from "pusher";

import rutas from './rutas/rutas.js';
import { PORT, PUSHER_APPID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER, MONGO_URI } from './config.js';

// App Config
const app = express();
const port = PORT;

const pusher = new Pusher({
    appId: PUSHER_APPID,
    key: PUSHER_KEY,
    secret: PUSHER_SECRET,
    cluster: PUSHER_CLUSTER,
    useTLS: true
});

// Middleware
app.use(cors());
app.use(express.json());

// DB Config
const mongoURI = MONGO_URI;
mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
    console.log('DB Connected');

    const changeStream = mongoose.connection.collection('posts').watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            pusher.trigger('post', 'newPost', {
                'change': change
            });
        }
        else {
            console.log('Error triggering pusher');
        }
    });
});

// Rutas
app.get('/', (req, res) => res.status(200).json({ msg: 'I message Backend' }));
app.use('/api/message', rutas);

// Listen
app.listen(port, () => console.log(`Listening on Localhost: http://localhost:${port}`));