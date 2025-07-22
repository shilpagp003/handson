const fs = require('fs');
const xml2js = require('xml2js');

// READ XML DATA
function readXmlData(filePath) {
    return new Promise((resolve, reject) => {
        const parser = new xml2js.Parser({ explicitArray: false });
        fs.readFile(filePath, (err, data) => {
            if (err) return reject(err);
            parser.parseString(data, (err, result) => {
                if (err) return reject(err);
                const students = result.Students.Student;
                resolve(Array.isArray(students) ? students : [students]); 
            });
        });
    });
}

// WRITE XML DATA
function writeXmlData(filePath, dataArray) {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject({ Students: { Student: dataArray } });
    fs.writeFileSync(filePath, xml);
    console.log(`XML file written successfully to: ${filePath}`);
}

module.exports = { readXmlData, writeXmlData };
