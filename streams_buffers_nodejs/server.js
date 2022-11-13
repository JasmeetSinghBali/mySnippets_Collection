const http = require('node:http');
const fs = require('node:fs');

const server = http.createServer((req, res)=>{
    if(req.url != '/'){
        return res.end();
    }
    /**
     * 📝downloading hypothetical big files sample.txt, sample.mp4 in optimized way via Streams
     */
    
    //======== .txt file =========
    // // step1: create readable stream from source
    // const readableStream = fs.createReadStream('sample.txt');

    // // step2: pipe(map) this [source] readableStream <---> writableStream (i.e res) [destination]
    // readableStream.pipe(res);

    //======= .mp4 file ========
    // // step1: create readable stream from source
    // const readableStream = fs.createReadStream('sample.mp4');

    // // step2: set content type for video file
    // res.writeHead(200,{ 'Content-Type': 'video/mp4' });

    // // step3: pipe(map) this [source] readableStream <---> writableStream (i.e res) [destination]
    // readableStream.pipe(res);

    /**
     * 📝 copying hypothetical big files from source to destination
     */
     
    // ❌ bad way
    // const file = fs.readFileSync('sample.txt');
    // fs.writeFileSync('ouptut.txt', file);
    // res.end();

    // ✔ optimised way
    // const readStream = fs.createReadStream('sample.txt');
    // const writeStream = fs.createWriteStream('output.txt');
    // readStream.on('data',(chunk)=>{
    //     console.log('Chunk: ', chunk, chunk.toString());
    //     writeStream.write(chunk);
    // });
    // res.end();

    /**
     * 📝 transform streaming: example string processing [THIS CAN BE VIDEO/AUDIO Processing the approach will be similar]
     */
    // example- processing 1. convert all to uppercase, 2. replace all downloaddata with some other word 

    const readableStream =  fs.createReadStream('sample.txt');
    const writableSteam = fs.createWriteStream('output.txt');

    // process incoming data in readable stream chunk by chunk
    readableStream.on('data',(chunk)=>{
        console.log('incoming data in buffer: ', chunk)
        const processedString = chunk.toString().replaceAll(/downloaddata/gi,'wasreplaced') // gi global insensitive i.e matches both uppercase and lowercase
        const processed2String = processedString.toUpperCase();
        writableSteam.write(processed2String);
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, ()=>{
    console.log(`stream&buffer server listening on ${PORT}`)
})