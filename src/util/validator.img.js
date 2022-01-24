import fs from 'fs';

const validationImg = (req, res, next) => {
    try {
        // Archivos Vacios
        if (typeof(req.file) === 'undefined') return next();

        // Obteniendo img
        let image = req.file.path;

        // validamos la extension del img
        if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')) {
            // removemos el archivo
            fs.unlinkSync(image);
            return res.status(400).json({
                message: 'Archivo no compatible'
            })
        }

        // Validamos el tamaño del archivo
        if(req.file.size > 1024 * 1024 * 4) {
            // removemos el archivo
            fs.unlinkSync(image);
            return res.status(400).json({
                message: 'El archivo es demasiado grande, se permite menor a 4MB'
            })
        }

    } catch (error) {
        res.status(400).json({
            message: 'Algo salio mal',
            error
        })
    }
    next();

};

export default validationImg;