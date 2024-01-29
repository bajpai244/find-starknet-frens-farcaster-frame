const puppeteer =require('puppeteer');

const main = async () => {
    const browser = await puppeteer.launch({ headless: true, defaultViewport: {
        width: 635,
        height: 933,
        isLandscape: true
    } });
    const page = await browser.newPage();
    await page.goto("https://warpcast.com/0d1n-fr33",   { waitUntil: 'networkidle2' });
    await sleep(5000);

    await page.screenshot({ path: "./data/screenshot.png", clip: clipRegion });
    await page.close();
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

main();
