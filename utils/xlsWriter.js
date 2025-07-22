const xlsx = require('xlsx');
const fs = require('fs');

exports.updateTestResult = (filePath, testResults) => {


  try {

    // Read workbook and first sheet
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: false });


    // Update each row's result, safely
    testResults.forEach((result, idx) => {
      if (sheet[idx]) {
        sheet[idx]['Test Result'] = result;
      }
    });

    // Convert updated data back to sheet and overwrite old one
    const updatedSheet = xlsx.utils.json_to_sheet(sheet);
    workbook.Sheets[sheetName] = updatedSheet;

    // Write the updated workbook to the same file
    xlsx.writeFile(workbook, filePath);

    console.log(`Successfully updated ${testResults.length} test results in "${filePath}"`);
  } catch (error) {
    console.error('Error updating test results:', error.message);
  }


};


