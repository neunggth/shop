const express = require('express');
const router = express.Router();
const userController =require('../controllers/userController');
const { body } = require ('express-validator');
/* GET users listing. */

// router.get('/', userController.index);
router.get('/:id/fullname/:name', userController.show);

router.post('/register', [
    body('name').not().isEmpty().withMessage('กรุณากรอกชื่อสกลุด้วย'), 
    body('email').not().isEmpty().withMessage('กรุณากรอกอีเมล').isEmail().withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({min: 3}).withMessage('กรุณากรอก 3ตัวขึ้นไป')
],userController.register);

//local 
router.post('/login', userController.login);

module.exports = router;
