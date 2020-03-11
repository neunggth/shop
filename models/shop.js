const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    photo: {type: String, default: 'nopic.png'},
    location: {
        lat: Number,
        lgn: Number
    }

},{
    timestamps:true,
    collection:'shops' ,
    toJSON: { virtuals:true },
    toObject: { virtuals: true}
});

schema.virtual('menus',{
    ref:'Menu' ,//ลิ้งค์ไปที่ models menu
    localField: '_id', //_id ของ model shop (ไฟล์นี้)
    foreignField: 'shop' //ฟิลด์ของ model Menu (FK)

})


const shop = mongoose.model('Shop', schema);

module.exports = shop;

