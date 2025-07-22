const { test } = require('@playwright/test');
const { readExcelData } = require('../utils/xlsReader');
const { updateTestResult } = require('../utils/xlsWriter');
const TextBoxPage = require('../pages/textBoxPage'); 

const path = require('path'); 

test('Submit form using .xls data and verify', async ({ page }) => {

    const filePath = path.resolve(__dirname, '../data/input-data.xlsx'); 
    console.log(`Reading data from: ${filePath}`);
    const dataSet = await readExcelData(filePath);
    console.log(`Data read successfully: ${JSON.stringify(dataSet)}`);
    const results = [];
  
    for (const record of dataSet) {
  
      await page.goto('https://demoqa.com/text-box');
      const formPage = new TextBoxPage(page);
      await formPage.fillForm(record);
      const pass = await formPage.verifySubmission(record);
      results.push(pass ? 'Pass' : 'Fail');

    }
  
    updateTestResult(filePath, results);
    console.log('Test results updated successfully.');

  });