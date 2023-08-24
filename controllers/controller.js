const CSV=require('../models/csv_file'); //access to database
const csv = require('csv-parser') //for parsing the csv file
const fs=require('fs');


//to load the home page with previously uploaded files.
module.exports.home= async function(req,res){
    try{
        let files=await CSV.find({});
        return res.render('home',{
            title: 'Home',
            files:files
        });
    }catch(err){
        console.log(err);
    }    
}

//controller to upload the file.
module.exports.upload= async function(req,res){
    try{
        CSV.uploadedCSV(req,res, async function(err){
            if(err){console.log('multer err')}
            //name of the file
            const name= req.file.originalname.split('.').slice(0,-1).join('.');
            let csv=await CSV.create({
                file: CSV.csvPath+'/'+req.file.filename,
                filename:name,
                path:req.file.path
            })
            return res.redirect('back');
        })
    }catch(err){
        console.log(err);
    }
}


//controller to delete the file 
module.exports.delete=async function(req,res){
    try{
        await CSV.findOneAndDelete({_id: req.query.id})
        return res.redirect('back');
    }catch(err){
        console.log(err);
    }
}

//controller to load the view when the user selects a file
module.exports.view=async function(req,res){
    try{
         let csvfile= await CSV.findById(req.query.id)
         let results=[];
         let header=[];
         fs.createReadStream(csvfile.path)
        .pipe(csv())
        .on('headers', (headers) => {
            headers.forEach(h=>{
                header.push(h)
            });
        })
        .on('data', (data) => 
            results.push(data))
        .on('end',()=>{
            return res.render('csvView',{
                title: csvfile.filename,
                header: header,
                datas:results,
            });
        });
    }catch(err){
        console.log(err);
    }
}