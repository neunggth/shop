const { validationResult} = require('express-validator');
const User = require('../models/user');

exports.register = async(req, res, next) => {
try {

    const {name, email, password } = req.body;
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
     const error = new Error('ข้อมูลที่ส่งไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errorValidation.array()
        throw error;
        };
    
// check email ซ้ำ 

    const existEmail =await User.findOne({email:email});
    console.log(existEmail);
    if (existEmail) {
        const error = new Error('อีเมลซ้ำ ลองใหม่อีกครั้ง');
        error.statusCode = 403;
        throw error;
    }


    let user = new User(); 
    user.name = name;
    user.email = email;
    user.password = password;
    console.log(password)
    user.password = await user.encryptPassword(password);
    await user.save();

    return res.status(201).json({
        message: 'ลงทะเบียนเรียบร้อย' 
    });

} catch(error) {
    next(error);
}

}
exports.login = async( req, res, next) => {
 try {
    const {email, password} = req.body;

    const user = await User.findOne({email:email});
    if (!user) {
        const error = new Error('ไม่พบผู้ใช้งานในระบบ');
        error.statusCode = 404;
        throw error;
    }

    //ถ้า User อยู่จริง ก็ตรวจสอบรหัสผ่าน ถ้ารหัสผ่านไม่ถูกต้อง ก็ให้ error ออกไป 
    
    const isValid = await user.validPassword(password);
    if(!isValid) {
        const error = new Error('รหัสผ่านไม่ถูกต้อง')
        error.statusCode =401;
        throw error;
    }

    return res.status(200).json({
        message: 'ล็อคอินเรียบร้อย'
});
 } catch (error) {
    next(error);  
 }
}

exports.show = (req, res, next) => {
    // const id = req.params.id;
    // const name = req.params.name
    // console.log(req.params);
    const {id ,name} = req.params;

    return res.status(200).json([
        {id: id , name: name},  
    ]);
}