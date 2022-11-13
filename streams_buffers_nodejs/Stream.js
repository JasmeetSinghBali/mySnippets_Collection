const { Writable, Readable } = require('node:stream');

/**📝 Custom readable stream */

// empty readable stream created via Readable class
const readableStream = new Readable({
    // optional: highWaterMark is thresh-hold in bytes of the buffer, if data exceeds 2bytes then the pushing of data in buffer will be optimized
    highWaterMark: 2,

    // compulsion: read() must be implemented i.e mentioning read(){} 
    read(){}

});

const writableStream = new Writable({
    // optional
    highWaterMark: 64,
    // compulsary
    write: function(s) {
        console.log('writing data buffer: ', s);
        console.log('writing data in string: ', s.toString());
    }
});

// listener when new data comes into the readable stream, push it to the readable stream
readableStream.on('data',(chunk)=>{
    console.log('data incoming in chunks: ', chunk); // ASCII code in hexadecimal
    console.log('data incoming in string: ', chunk.toString());
    writableStream.write(chunk);
});

// push new data to empty readable stream
// readableStream.push() returns true if the data is below highWaterMark else returns false i.e buffer size exceeds highWaterMark or equal to highWaterMark bytes size of buffer
// ⭐👀 now a/c to this boolean value the data can be handled acordingly or the stream can be paused
console.log(readableStream.push('Hello new data was pushed to readable stream'));
