const express= require('express');
const router=express.Router();
const homeController= require('../controllers/controller');

router.get('/', homeController.home);
router.post('/upload-csv', homeController.upload);
router.get('/delete', homeController.delete);
router.get('/view', homeController.view);


module.exports=router;