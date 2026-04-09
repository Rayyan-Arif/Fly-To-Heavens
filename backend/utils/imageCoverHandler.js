const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    } else {
        cb(new AppError('not an image',400));
    }
}

exports.upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.resizePhoto = (type, width, height, dir) => {
    return async(req, res, next) => {
        if(!req.file) return next();
    
        if(type === 'user')
            req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
        else if(type === 'flight')
            req.file.filename = `flight-${Date.now()}.jpeg`;
        
        try{
            await sharp(req.file.buffer)
            .resize(width, height)
            .toFormat('jpeg')
            .jpeg({quality: 90})
            .toFile(`${__dirname}/../../frontend/assets/${dir}_img/${req.file.filename}`); 
        } catch(err){
            next(err);
        }
    
        next();
    }
}