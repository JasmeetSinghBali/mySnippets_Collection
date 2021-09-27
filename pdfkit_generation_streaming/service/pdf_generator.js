PDFDocument = require('pdfkit');

function buildPDF(dataCallback,endCallback){
    const doc = new PDFDocument();
    // instead of piping to a file we want to send it to client
    // a event on doc when it receives some data
    doc.on('data',dataCallback);
    doc.on('end',endCallback);
    doc
      .fontSize(25)
      .text('First pdf generated via pdfkit');
    doc.end();
}

module.exports = {buildPDF};