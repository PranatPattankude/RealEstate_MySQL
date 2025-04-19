import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import s3 from '../Configuration/s3config.js'; 

dotenv.config();

const uploads = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read', // or 'private' if you want restricted access
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const filename = Date.now() + '-' + file.originalname;
      cb(null, filename);
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // Max file size: 5MB
});

export default uploads;


// ---------------------------------------------------------

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads/')
//     },

//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+path.extname(file.originalname))// path.extname(file.originalname) create a string
//     }
// })

// const fileFilter=(req,file,cb)=>{
//     const allowType=['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
//     if(allowType.includes(file.mimetype)){
//         cb(null,true)
//     }else{
//         cb(new error('file type not supported'))
//     }
// }

// const uploads = multer({storage,fileFilter})
// export default uploads;