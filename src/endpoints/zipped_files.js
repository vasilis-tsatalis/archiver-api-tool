const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

require('dotenv/config');

const decode_file = require('../functions/file_decoder');
// const { archiver } = require('../../modules/archive');
const archiver = require('archiver');

exports.received_files = async (req, res, next) => {

    try{

        const { password, encryption, received_files } = req.body;

        const temp_path = process.env.ZIP_PATH;

        // ZIP name
        const _zipid = uuidv4();
        const _archived = `${_zipid}.zip`
        const _archived_fullname = `${temp_path}${_archived}`
        const output = fs.createWriteStream(_archived_fullname);

        if (encryption === true) {
            // Sets the compression level.
            var archive = archiver('zip-encrypted', {
                zlib: { level: `${process.env.COMPRESS_LEVEL}` },
                forceLocalTime: true,
                encryptionMethod: 'aes256',
                password: password
            });
        } else if (encryption === false) {
            var archive = archiver('zip', {
                zlib: { level: process.env.COMPRESS_LEVEL } 
            });
        } else {
            res.sendStatus(400).json({ message: 'encryption error value - bool' });
        };

        // pipe archive data to the file
        archive.pipe(output);

        for (let item of received_files) {
            // console.log(item);
            // files elements
            let file_name = item['name'];
            let file_format = item['format'];
            let file_content = item['content'];

            let file_fullname = await decode_file(file_format, file_content);
            // append a file into zip
            archive.file(`${file_fullname}`, { name: `${file_name}` });
        }

        // finalize the archive
        archive.finalize();
        archive.pipe(res);
        //res.sendStatus(201)

    }catch(err){
        res.sendStatus(400).json({ message:err });
    }
};