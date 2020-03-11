const Shop = require('../models/shop');
const Menu = require('../models/menu');
const config = require('../config/index')


exports.index = async (req, res, next) => {
    // const shop = []
    // const shop = await Shop.find();
    // const shop = await shop.find().sort({_id: -1});
    const shop = await Shop.find().select('name photo location').sort({_id: -1});

    const shopWithPhoto = await shop.map(( shop, index) => {
        return {
    id: shop._id,
    name: shop.name,
    photo: config.DOMAIN + '/images/' + shop.photo,
    location: shop.location
        }
    });

    return res.status(200).json({
        date: shopWithPhoto
 });
}

//get menu with shop 
exports.menu = async (req, res, next) => {
    // const menu = await Menu.find().select('+name -price');
    // const menu = await Menu.find().where('price').gte(100);
    // const menu = await Menu.find().where('price').gte(100);
    // const menu = await Menu.find().populate('shop');
    const menu = await Menu.find().populate('shop', 'name location').sort('-_id');
    

    return res.status(200).json({
        date: menu
    });

}

//get shop with menu 
exports.getShopWithMenu = async (req, res, next) => {
    const { id } =req.params;

    const shopWithMenu = await Shop.findById(id).populate('menus');


    return res.status(200).json({
        date: shopWithMenu
 });
}

// insert shop 
exports.store = async (req, res, next) => {
    // const {name, location } =req.body;
    // const shop = new shop({
    //         name:name,
    //         location: location
    // })

    const shop = new Shop(req.body);
    await shop.save();

    return res.status(201).json({
        message: 'เพิ่มข้อมูลเรียบร้อย'
 });
}
