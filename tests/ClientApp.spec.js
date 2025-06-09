const {test, expect}=require('@playwright/test');

test.only('Browser context-validating Error login' , async({page})=>
{
    const email="01ashu32@gmail.com";
    const productName= 'ZARA COAT 3';
    const products=page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("01@shuAcademy");
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle'); // wait until the all api are calling in netword tab
    await products.last().waitFor();
    const title= await products.allTextContents();

   console.log(title);

   //zara coat 
   const count=await products.count();
   for (let i=0; i< count;++i){
    if (await products.nth(i).locator("b").textContent() == productName)
    {
        // add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }

   }

   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor(); // added waiting perioed to the visisble on the page
   const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
  // dynamic dropdown select 
   await page.locator("button[type='button']").last().click();
   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropdown= await page.locator(".ta-results");
   await dropdown.waitFor();
   const optionCount=await dropdown.locator("button").count();
   for(let j=0; j<optionCount;j++)
   {
     const text= await dropdown.locator("button").nth(j).textContent();
     if(text == " India")
     {
        await dropdown.locator("button").nth(j).click();
        break;
     }

   }

   //credit card number entere
   await page.locator(".field input[class*='text-validated']").fill("4542 9931 9292 2293");

//    await page.locator("select[class*='input']").first().click();
//    await page.locator("select[class*='input']").last().fill("29");
   
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();

   await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

   const orderId=await page.locator(".ng-star-inserted label[class='ng-star-inserted']").textContent();
   console.log(orderId);
 
   //search order id from the table and clik on view button
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows=await page.locator("tbody tr");
   for (let k=0; k< await rows.count(); k++)
   {
    const rowOrderId=await rows.nth(k).locator("th").textContent();
    if(orderId.includes(rowOrderId))
        {
           await rows.nth(k).locator("button").first().click();
           break;
        }
   }

   const orrIdDetails=await page.locator(".col-text").textContent();
   expect(orderId.includes(orrIdDetails)).toBeTruthy();

});

