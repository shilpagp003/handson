// Importing required modules
const fs = require('fs');
const { parse } = require('json2csv');

// Write data to a CSV file
function writeCsvData(filePath, dataArray) {
    try {
        const csvString = parse(dataArray);  // Converts array of objects to CSV text
        fs.writeFileSync(filePath, csvString);
        console.log(`CSV written successfully to: ${filePath}`);
    } catch (error) {
        console.error('Error writing CSV file:', error.message);
    }
}

module.exports = { writeCsvData };
