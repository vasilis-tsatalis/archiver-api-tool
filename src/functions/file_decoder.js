'use strict';

const fs = require('fs');
const Readable = require('stream').Readable
const { v4: uuidv4 } = require('uuid');
require('dotenv/config');

// This function receives a base64 string 
// and returns unique id from temp file
module.exports = async (file_ext, bstring) => {

    const temp_path = process.env.TEMP_PATH;
    const _id = uuidv4();
    const fullname = `${temp_path}${_id}.${file_ext}`;

    const fileBuffer = Buffer.from(bstring, 'base64')

    const s = new Readable()
    s.push(fileBuffer)   
    s.push(null) 
    s.pipe(fs.createWriteStream(fullname));
    
    return fullname
};
