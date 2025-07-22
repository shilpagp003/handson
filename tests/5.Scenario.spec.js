const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const TextBoxPage = require('../pages/textBoxPage'); 

test('Submit form using JSON data and verify', async ({ page }) => {
    const filePath = path.resolve(__dirname, '../data/json_data.json');
    console.log(`Reading data from: ${filePath}`);
    const dataSet = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(`Data read successfully: ${JSON.stringify(dataSet)}`);

    for (const record of dataSet) {
        await page.goto('https://demoqa.com/text-box');
        const textBoxPage = new TextBoxPage(page); 
        await textBoxPage.fillForm(record);
        const result = await textBoxPage.verifySubmission(record);

        
        const pass = result.name && result.email && result.currentAddress && result.permanentAddress;
        record.testResult = pass ? 'Pass' : 'Fail';
    }

    fs.writeFileSync(filePath, JSON.stringify(dataSet, null, 2), 'utf-8');
    console.log('Test results updated successfully in the JSON file.');
});

test.afterAll(async () => {
    console.log('All tests completed.');
});