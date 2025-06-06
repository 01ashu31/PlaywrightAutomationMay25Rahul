const {test}=require('@playwright/test');

test.only('Browser context-validating Error login' , async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    // sawait page.waitForLoadState('networkidle'); // wait until the all api are calling in netword tab
    await page.locator(".card-body b").last().waitFor();
    const title= await page.locator(".card-body b").allTextContents();

   console.log(title);

});

