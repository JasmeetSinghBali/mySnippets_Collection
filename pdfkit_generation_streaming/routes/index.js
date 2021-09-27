const express = require('express');

const router = express.Router();

// pdf generation service
const pdfGenerator = require('../service/pdf_generator');

router.get('/invoice',(req,res,next)=>{
    // send back stream back of data to client
    // i.e stream the generated pdf by the pdf_generator service
    // content-disosition tells the browser wheather this data should be displayed in browser
    // or we are just downloading an attachment
    const stream = res.writeHead(200,{
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=invoice.pdf'
    });

    // as soon as a chunk of data received we add that data to the stream object that we are sending to client
    pdfGenerator.buildPDF(
        (chunk)=>{
            stream.write(chunk);
        },
        // close the connection when all data has been streamed
        () => {
            stream.end();
        }
    );
});

module.exports = router;