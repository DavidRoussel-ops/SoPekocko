const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.use(bodyParser.json());

router.post('/', auth, multer, stuffCtrl.createSauces);
router.post('/:id/like', auth, stuffCtrl.saucesIdLike);
router.get('/', auth, stuffCtrl.getAllSauces);
router.get('/:id', auth, stuffCtrl.getOneSauces);
router.put('/:id', auth, multer, stuffCtrl.updateSauces);
router.delete('/:id', auth, stuffCtrl.deleteSauces);


module.exports = router;
