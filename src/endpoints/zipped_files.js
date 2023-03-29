const fs = require('fs');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');

require('dotenv/config');

const decode_file = require('../functions/file_decoder')
const encode_file = require('../functions/file_encoder')

archiver.registerFormat('zip-encryptable', require('archiver-zip-encryptable'));

exports.received_files = async (req, res, next) => {

    try{

        const { password, encryption, received_files } = req.body;

        const temp_path = process.env.TEMP_PATH;
        
        // ZIP name
        const _zipid = uuidv4();
        const _archived = `${_zipid}.zip`
        const _archived_fullname = `${temp_path}${_archived}`

        const output = fs.createWriteStream(_archived_fullname);

        if (encryption === 'Y') {
            // Sets the compression level.
            var archive = archiver('zip-encryptable', {
                zlib: { level: process.env.COMPRESS_LEVEL },
                forceLocalTime: true,
                password: password
            });
        } else {
            var archive = archiver('zip', {
                zlib: { level: process.env.COMPRESS_LEVEL } 
            });
        };

        // pipe archive data to the file
        archive.pipe(output);

        for (let item of received_files) {
            // files elements
            let file_name = item['name'];
            let file_format = item['format'];
            let file_content = item['content'];

            let file_fullname = await decode_file(file_format, file_content);
            // append a file into zip
            archive.file(file_fullname, { name: file_name });
        };
        // finalize the archive
        archive.finalize();

        //const zip_data = await encode_file(_archived);


        const options = {
            root: temp_path
        };
     
        res.sendFile(_archived, options, function (err) {
            if (err) {
                next(err);
            } else {
                console.log('Sent:', _archived);
            }
        });

        //res.sendStatus(200)
    }catch(err){
        res.sendStatus(400).json({ message:err });
    }
};