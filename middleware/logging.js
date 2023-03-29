const path = require('path');
const rfs = require('rotating-file-stream');

const YYYYMMDD = require('../src/functions/find_date').YYYYMMDD;

// create a rotating write stream for logging
const accessLogStream = rfs.createStream(YYYYMMDD + '_access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'logs')
});

module.exports = accessLogStream;