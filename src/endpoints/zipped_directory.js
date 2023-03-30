const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

require('dotenv/config');

const { archiver } = require('../../modules/archive')

exports.received_directory = async (req, res, next) => {

    try{

        const { password, encryption, directory } = req.body;

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

        // append files from a sub-directory, putting its contents at the root of archive
        archive.directory(directory, false);

        // finalize the archive
        archive.finalize();
        //const zip_data = await encode_file(_archived);

        archive.on('open', () => {
            archive.pipe(res);
            res.sendStatus(201)
        });
        archive.on('error', err => {
            next(err);
        });

    }catch(err){
        res.sendStatus(400).json({ message:err });
    }
};