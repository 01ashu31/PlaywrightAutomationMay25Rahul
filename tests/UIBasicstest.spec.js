const { test, expect } = require('@playwright/test');




test('First Playwight test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const username=page.locator('#username');
    const pass= page.locator("[type='password']");
    const signinButton= page.locator("#signInBtn");
    const cardTitle=page.locator(".card-body a");
    


    //css
    await username.fill("rahulshetty");
    await pass.fill("learning");
    await signinButton.click(); 
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signinButton.click();
//    console.log( await cardTitle.first().textContent());
//    console.log( await cardTitle.nth(1).textContent());

   const allTitle=await cardTitle.allTextContents();
   console.log(allTitle);


});

test('Page playwright test', async ({ page }) => {
    await page.goto("https://google.com/");
    //get title --assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('UI Controls', async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName=page.locator('#username');
    const userPassword=page.locator('#password');
    const signIn=page.locator("#signInBtn");
    const staticDropdown=page.locator("select.form-control");

    const documentLink=page.locator("[href*='documents-request']");

    await userName.fill("rahulshettyacademy");
    await userPassword.fill("learning");

    //static dropdown select
    await staticDropdown.selectOption("consult");
    // radio button select
    await page.locator('label.customradio').last().click();
    //web based pop up handle
    await page.locator('#okayBtn').click();
    //assertion for radio button selected 
    await expect(page.locator('label.customradio').last()).toBeChecked();

    //different method for assertion to print as true and false
    console.log(await page.locator('label.customradio').last().isChecked());

    //checkbox to select 
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();

    await page.locator('#terms').uncheck();

    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    //link blinking

    await expect(documentLink).toHaveAttribute("class","blinkingText");


    //await page.pause(); // to pause the execution before closing the browser ortill when you are not resuming als opening playwright inspector 
    await signIn.click();

});

test.only('Child window handle', async ({browser}) =>
{
    const context=await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentlink=page.locator("[href*='documents-request']");
    const username=page.locator('#username');

    //handling next page
    const [newPage]= await Promise.all(
    [
    context.waitForEvent('page'),//listen for any new pages
    documentlink.click(), // new page opened
   
    ])

    const text= await newPage.locator("p.red").textContent();
    await console.log(text);
    const arrayText= text.split("@")
    const domain=arrayText[1].split(" ")[0]
    await console.log(domain);
    await username.fill(domain);
    console.log(await username.textContent());
    

    




});