import User from '../models/User.js';
import bcrypt from 'bcryptjs';

import { validateRegister, validateLogin } from '../util/validator.user.js';
import { generateToken } from '../util/token.js';

export const createUser = async (req, res) => {
    const { name, username, password, confirmPassword } = req.body;

    try {
        const { errors, valid} = validateRegister(name, username, password, confirmPassword);

        if (!valid) {
            throw errors
        };

        const usuario = await User.findOne({ username });
        if (usuario) {
            throw errors.username = {
                username: 'El usuario ya existe',
            }
        };

        const contrasena = await bcrypt.hash(password, 6);

        await User.create({ name, username, password: contrasena });

        return res.status(200).json({ message: 'Usuario Creado con exito' });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { valid, errors } = validateLogin(username, password);
        
        if (!valid) {
            throw errors
        };

        const user = await User.findOne({ username });
        if (!user) {
            throw errors.username = {
                username: 'Credenciales no válidas'
            }
        };

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw errors.password = {
                password: 'Credenciales no válidas'
            }
        };

        const token = generateToken(user);

        return res.status(200).json({
            id: user._id,
            name: user.name,
            username: user.username,
            token
        });

    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

export const getThreeUser = async (req, res) => {
    const { username } = req.userToken;

    try {
        const user = await User.find({
            username: { $ne: username }
        })
        .sort({ createdAt: -1})
        .limit(3);

        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};