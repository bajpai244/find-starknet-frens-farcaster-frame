const crypto = require('crypto');
const fs = require('fs');

function generateSHA256Hash(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}

const sleep = async (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getProfileLists =  () => {
    let data = JSON.parse(fs.readFileSync('./data/frenList.json'));
``
    return data.map(({ frenFarCasterProfileUrl }) => {
        return frenFarCasterProfileUrl
    });
};

const profileUrlToPath = (profileUrl) => {
    return `./data/${generateSHA256Hash(profileUrl)}.png`;
}

module.exports = {
    generateSHA256Hash,
    sleep,
    getProfileLists,
    profileUrlToPath
}
