const {test, expect} = require('@playwright/test');
const { readExcelData } = require('../utils/xlsReader');
const { updateTestResult } = require('../utils/xlsWriter');

const FormPage = require('../pages/formPage');

const path = require('path');

test('Submit form using .xls data and verify', async ({ page }) => {
    const filePath = path.resolve(__dirname, '../data/form-input.xlsx');
    console.log(`Reading data from: ${filePath}`);
    const dataSet = await readExcelData(filePath);
    console.log(`Data read successfully: ${JSON.stringify(dataSet)}`);
    const results = [];

    for (const record of dataSet) {
        await page.goto('https://demoqa.com/automation-practice-form');
        const formPage = new FormPage(page);
        await formPage.fillForm(record);
        const pass = await formPage.verifySubmission(record);
        results.push(pass ? 'Pass' : 'Fail');
    }

    updateTestResult(filePath, results);
    console.log('Test results updated successfully.');
});

test.afterAll(async () => {
    console.log('All tests completed. Check the results in the Excel file.');
});