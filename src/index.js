const crypto = require('crypto');
const fs = require('fs');
const puppeteer =require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();

const main = async () => {
    const browser = await puppeteer.launch({ headless: true, defaultViewport: {
        width: 635,
        height: 933,
        isLandscape: true
    } });

    const frenList = await fetchFrenList(browser);
    fs.writeFileSync('./data/frenList.json', JSON.stringify(frenList));

    for (let i = 0; i < frenList.length; i++) {
        const fren = frenList[i];
        let frenFarCasterProfileUrl = fren.frenFarCasterProfileUrl;
    const page = await browser.newPage();
    await page.goto(frenFarCasterProfileUrl,   { waitUntil: 'networkidle2' });
    await sleep(5000);

    await page.screenshot({ path: `./data/${generateSHA256Hash(frenFarCasterProfileUrl)}.png`, clip: clipRegion });
    await page.close();
    }

}

function generateSHA256Hash(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}

// Example usage:
const clipRegion = {
    x: 0,    // The x-coordinate of the top-left corner of the clip area
    y: 0,    // The y-coordinate of the top-left corner of the clip area
    width: 635,  // The width of the clip area
    height: 200  // The height of the clip area
  };


  const sleep = async (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const fetchFrenList = async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://github.com/keep-starknet-strange/starknet-warpcast/blob/main/builder_follow_builder.md",   { waitUntil: 'domcontentloaded' });
    await sleep(2000);

   let result = await page.evaluate(() => {
        const arr = [];
        let table = document.getElementsByTagName('table')[0];
        let tableBody = table.children[1];

        for (let i =0 ; i < tableBody.children.length; i++) {
            let row = tableBody.children[i];
            let frenName = row.children[0].innerText;
            let frenFarCasterProfileUrl =  row.children[1].children[0].href;

            arr.push({frenName, frenFarCasterProfileUrl});
        }

        return arr;
    });

    await page.close();

    return result;
  }



main();
