// Importing required libraries
const fs = require('fs');
const csv = require('csv-parser');

// Read data from a CSV file
function readCsvData(filePath) {
    const data = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => data.push(row))  // Each row becomes an object
            .on('end', () => resolve(data))       // Resolves with complete array
            .on('error', reject);                 // Catches file errors
    });
}

module.exports = { readCsvData };
