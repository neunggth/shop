const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    price: { type: Number },
    shop: { type: Schema.Types.ObjectId, ref:'Shop'},


},{
    toJson: { virtuals: true }

});
var price_vat = schema.virtual('price_vat').get(function(value, virtual, doc) {
  return (this.price*0.07)+this.price; 
});

const menu = mongoose.model('Menu', schema);

module.exports = menu;
