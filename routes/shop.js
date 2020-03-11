const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController')

/* GET users listing. */
// http://lacalhost:4000/api/shop
router.get('/', shopController.index);
// http://lacalhost:4000/api/shop/menu
router.get('/menu', shopController.menu);
// http://lacalhost:4000/api/shop/id
router.get('/:id', shopController.getShopWithMenu);
// http://lacalhost:4000/api/shop/
router.post('/', shopController.store);




module.exports = router;