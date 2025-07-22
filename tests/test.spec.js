const {test, expect} = require("@playwright/test");

test("Add custom Attributes", async({page}) =>{
    const url = await page.goto("https://demoqa.com/automation-practice-form");
    const FirstName = await page.locator("#firstName");
    await FirstName.fill("Tarak");


    function addAttribute(){
        
    }

});