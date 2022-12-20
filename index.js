const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context, callback) => {
    let result = null;
    let browser = null;

    try {
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        let page = await browser.newPage();
        await page.goto('https://ifconfig.io/ip');
        result = await page.body();
        // output your ip
        console.log(result);
    } catch (error) {
        console.log(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};
