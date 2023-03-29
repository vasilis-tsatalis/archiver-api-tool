'use strict';

const fs = require('fs');
require('dotenv/config');

// This function receives a file fullname 
// and returns the encode format in base64
module.exports = async (file) => {

    const temp_path = process.env.TEMP_PATH;
    const fullname = `${temp_path}${file}`;

    const buff = fs.readFileSync(`${fullname}`);
    const base64data = buff.toString('base64');    
    console.log(base64data)
    return base64data
};
