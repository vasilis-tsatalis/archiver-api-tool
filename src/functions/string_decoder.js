'use strict';

// This function receives a base64 string 
// and returns converted string to utf-8 encode
module.exports = async (bstring) => {
    const data = bstring;
    const buff = new Buffer.from(data, 'base64');
    const text = buff.toString('ascii');
    return text
};
