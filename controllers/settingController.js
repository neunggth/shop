const setting = require('../models/setting');

exports.index = async (req, res, next) => {
    const company = await setting.findOne();

    return res.status(200).json({
        date: company
 });
}

