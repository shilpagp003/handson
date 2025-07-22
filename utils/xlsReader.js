// Importing the XLSX Library
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// // const filePath = '../data/input-data.xlsx';
const filePath = path.resolve(__dirname, '../data/input-data.xlsx');
// // console.log('Reading Excel file from:', filePath);
// const workbook = xlsx.readFile(filePath);
// const sheetName = workbook.SheetNames[0]; 
// const worksheet = workbook.Sheets[sheetName];
// console.log(workbook);
// console.log(sheetName);
// console.log(worksheet);
// console.log(xlsx.utils.sheet_to_json(worksheet));

// console.log(filePath);
// Read data from an Excel file
function readExcelData(filePath) {

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; 
    const worksheet = workbook.Sheets[sheetName];
    //Converts the worksheet content into JSON format, which is easy to work with in JavaScript.Each row becomes an object, and each column header becomes a key.
    return xlsx.utils.sheet_to_json(worksheet);  

}

module.exports = { readExcelData };




