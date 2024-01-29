const express = require('express');
const { generateSHA256Hash } = require('./utils');
const app = express();

const port = 3000;

const base_url = 'https://3d9c-2406-7400-63-5992-00-100.ngrok-free.app';
const profileAbdel = 'https://warpcast.com/abdel'
const profile_url = `${base_url}/data/${generateSHA256Hash(profileAbdel)}.png`;
const post_url = '${base_url}/callback';

// Serve static files from the 'data' directory
app.use('/data', express.static('data'));

app.get('/', (req, res) => {
    res.send(`
  <html>
  <head>
  <meta property="fc:frame" content="vNext"/>
  <meta property="fc:frame:image" content="${profile_url}"/>
  <meta property="fc:frame:button:1" content="Find Next Fren :)"/>
  <meta property="fc:frame:post_url" content="${post_url}"/>
  </head>
  <body>
  </body>
  </html>
  `);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
