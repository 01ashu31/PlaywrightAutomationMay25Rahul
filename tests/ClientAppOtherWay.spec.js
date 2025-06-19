const {test, expect}=require('@playwright/test');

test.only('Browser context-validating Error login' , async({page})=>
{
    const email="01ashu32@gmail.com";
    const productName= 'ZARA COAT 3';
    const products=page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("01@shuAcademy");
    await page.getByRole('button', {name: 'Login'}).click();
    await page.waitForLoadState('networkidle'); // wait until the all api are calling in netword tab
    await products.last().waitFor();

   //zara coat 
   await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'})
   .getByRole("button",{ name: "Add to Cart"}).click();

   await page.getByRole("listitem").getByRole('button',{name : 'Cart'}).click();


   await page.locator("div li").first().waitFor(); // added waiting perioed to the visisble on the page
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   
  // dynamic dropdown select 
   await page.getByRole("button",{name :"Checkout"}).click();
   await page.getByPlaceholder("Selet Country").pressSequentially("ind");

   await page.getByRole("button", {name : 'India'}).nth(1).click();


  
   await page.getByText("PLACE ORDER").click();

   await expect( page.getByText("Thankyou for the order.")).toBeVisible();

   const orderId=await page.locator(".ng-star-inserted label[class='ng-star-inserted']").textContent();
   
});

