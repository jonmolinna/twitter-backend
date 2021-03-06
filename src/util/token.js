import jwt from 'jsonwebtoken';

// Create Token
export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            name: user.name,
        },
        'ULTRA_SECRET_TOKEN',
        { expiresIn: '1h' }
    )
};


// Verify Token
export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: 'No tienes autorización'});

        const bearer = token.split(" ");
        const bearerToken = bearer[1];

        const decoded = jwt.verify(bearerToken, 'ULTRA_SECRET_TOKEN');
        req.userToken = decoded;

    } catch (err) {
        return res.status(401).json({ message: 'No tienes autorización'});      
    }
    next();
};