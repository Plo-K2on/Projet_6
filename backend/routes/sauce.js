const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const bodyParser = require('body-parser')
const auth = require('../middleware/auth');


const sauceCtrl = require('../controllers/sauce.js');
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.get('/:id', auth, multer, sauceCtrl.getOneSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id', auth, multer, sauceCtrl, likeSauce);
router.get('/', sauceCtrl.allSauces);

module.exports = router;