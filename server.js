'use strict';
// load npm modules
const express = require("express");
const https = require("https");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const archiver = require('archiver');
archiver.registerFormat('zip-encrypted', require("archiver-zip-encrypted"));

// Read system parameters
require('dotenv/config');

// Logging function
const accessLogStream = require('./middleware/logging');

// Mandatory Exposed Parameters
const BASE_URL = process.env.BASE_URL || '/zip';
const PORT = process.env.PORT || 3334;

const app = express();
app.use(express.json({limit: process.env.REQUEST_LIMIT}));
app.use(express.urlencoded({extended: true, limit: process.env.REQUEST_LIMIT}));

// setup the logger - keep access logs file or not
if (process.env.WRITE_ACCESS_LOGS == 'Y') {
  app.use(morgan('combined', { stream: accessLogStream }));  
};

// Routes 
app.use(BASE_URL, require("./routes/api"));

// Default response for any other request
app.use(function(req, res){
  res.status(404);
});

//----------HTTPS SERVER----------//
const server = https.createServer(
    {
        // Full path parametrical values
        key: fs.readFileSync(process.env.KEY_VALUE),
        cert: fs.readFileSync(process.env.CERT_VALUE),
    },
    app)
    .listen(PORT, () => {
        console.log(`Server is running on https://localhost:${PORT}${BASE_URL}`);
    });

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
