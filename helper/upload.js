import multer from 'multer'
import path from 'path'

const storageMulter = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        req.headers.index = req.headers.index ? req.headers.index++ : 0;
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file extension!'), false);
    }
}

const upload = multer({storage: storageMulter, fileFilter: fileFilter});

export default upload;