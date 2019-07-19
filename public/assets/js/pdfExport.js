const PDFdoc = require('pdfkit');
const fs = require('fs');

const doc = new PDFdoc;

doc.pipe(fs.createWriteStream('../../../pdfs/output.pdf'));

doc.end();



