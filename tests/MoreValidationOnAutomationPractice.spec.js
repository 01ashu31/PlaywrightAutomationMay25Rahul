const {test, expect} = require ('@playwright/test')

test("Popup validation", async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    
    // Text box is visible and hidden assertion
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    
    // await page.pause();

    //alert popup/ dialogue popup
    page.on('dialoge', dialoge => dialoge.accept());
    //  page.on('dialoge', dialoge => dialoge.dismiss());

    await page.locator("#confirmbtn").click();

    //Hover feature

    await page.locator("#mousehover").hover();

    //ifrane handles

    const framePage= page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();

    const text=await framePage.locator(".text h2").textContent();
    await console.log(text.split(" ")[1]);

    

})