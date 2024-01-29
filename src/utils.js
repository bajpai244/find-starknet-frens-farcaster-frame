const crypto = require('crypto');

function generateSHA256Hash(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}

module.exports = {
    generateSHA256Hash
}
