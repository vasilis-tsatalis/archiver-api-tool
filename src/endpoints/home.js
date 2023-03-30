const fs = require('fs');
var path = require('path');

require('dotenv/config');

exports.default_page = async (req, res, next) => {

    try{
        res.sendFile(path.resolve('../middleware/res_files/home.html'));
    }catch(err){
        res.sendStatus(400).json({ message:err });
    }
};