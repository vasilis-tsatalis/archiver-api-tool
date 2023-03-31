const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

require('dotenv/config');

// const { archiver } = require('../../modules/archive');
const archiver = require('archiver');

exports.received_directory = async (req, res, next) => {

    try{

        const { password, encryption, directory } = req.body;

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

        // append files from a sub-directory, putting its contents at the root of archive
        // archive.directory(directory, false);

        fs.readdir(directory, (err, files) => {
          if (err) return console.log(err);
          for (let file of files) {
            // console.log(file);
            // append a file into zip
            archive.file(`${file}`, { name: `${file}` });
          }
        });

        // finalize the archive
        archive.finalize();

        archive.on('open', () => {
            archive.pipe(res);
            //res.sendStatus(201)
        });
        archive.on('error', err => {
            next(err);
        });

    }catch(err){
        res.sendStatus(400).json({ message:err });
    }
};