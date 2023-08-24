const mongoose= require('mongoose');

const multer= require('multer');
const path=require('path');

const CSV_PATH=path.join('/uploads/csv');

const csvSchema= new mongoose.Schema({
    file:{
        type: String
    },
    filename:{
        type: String
    },
    path:{
        type: String
    }
},{
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',CSV_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
csvSchema.statics.uploadedCSV = multer({ storage: storage }).single('file');
csvSchema.statics.csvPath=CSV_PATH;

const CSV=mongoose.model('CSV',csvSchema);

module.exports=CSV;