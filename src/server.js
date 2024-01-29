const express = require('express');
const { getProfileLists } = require('./utils');
const { sync } = require('./sync');
const app = express();

const port = 3000;

sync();
let profileList = [];

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
