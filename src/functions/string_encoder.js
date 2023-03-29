'use strict';

// This function receives a utf-8 string 
// and returns converted string to base64 format
module.exports = async (text) => {
    const data = text;
    const buff = new Buffer.from(data);
    const base64data = buff.toString('base64');
    return base64data
};
