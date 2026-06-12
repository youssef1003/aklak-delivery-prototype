import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.toString()));

  const BASE_URL = 'http://localhost:5173';

  try {
    console.log('Testing Home Page...');
    await page.goto(BASE_URL);
    await page.waitForSelector('h1');

    console.log('Testing Customer App...');
    await page.goto(`${BASE_URL}/customer`);
    
    console.log('Testing Customer Home...');
    await page.goto(`${BASE_URL}/customer/home`);
    
    console.log('Testing Restaurant App...');
    await page.goto(`${BASE_URL}/restaurant-dashboard`);

    console.log('Testing Driver App...');
    await page.goto(`${BASE_URL}/driver`);

    console.log('Testing Admin App...');
    await page.goto(`${BASE_URL}/admin-dashboard`);

    console.log('All basic navigation tests passed!');
    console.log('Console errors:', errors);

  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await browser.close();
  }
})();
