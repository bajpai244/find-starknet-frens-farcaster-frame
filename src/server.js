const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const { getProfileLists } = require('./utils');
const { sync } = require('./sync');

const app = express();

const port = 3000;


sync();
let profileList = [];

// Serve static files from the 'data' directory
app.use('/public', express.static('public'));

// Serve static files from the 'data' directory
app.use('/data', express.static('data'));

// The request should download all the images to the 'data' directory
// NOTE: should be called periodically from a cron job
app.post('/sync', (req, res) => {
    sync();
    profileList = getProfileLists();
    res.send('OK');
});

// The request should return the URL of the next profile to be displayed
app.get('/next_profile', (req, res) => {
    if (profileList.length === 0) {
        profileList = getProfileLists();
    }

    let profile_url = profileList.pop();
    res.send(profile_url);
});

if (process.env.PROD == "true") {
    // Read the certificate and private key
    const privateKey = fs.readFileSync(path.join("/etc/letsencrypt/live/www.kakachain.xyz", 'privkey.pem'), 'utf8');
    const certificate = fs.readFileSync(path.join("/etc/letsencrypt/live/www.kakachain.xyz", 'cert.pem'), 'utf8');

    const credentials = { key: privateKey, cert: certificate };

    // Create an HTTPS server
    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(port, () => {
        console.log(`HTTPS Server running on port ${port}`);
    });
} else {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}
