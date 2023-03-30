// module dependency
// unique definition

const archiver = require('archiver');
archiver.registerFormat('zip-encryptable', require('archiver-zip-encryptable'));

module.exports = { archiver };
