const { test, expect } = require('@playwright/test');




test('First Playwight test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(page.title());

});

test('Page playwright test', async ({ page }) => {
    await page.goto("https://google.com/");
    //get title --assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});