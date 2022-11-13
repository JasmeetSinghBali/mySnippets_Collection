const { Readable } = require('node:stream');

/**📝 Custom readable stream */

// empty readable stream created via Readable class
const readableStream = new Readable({
    // optional: highWaterMark is thresh-hold in bytes of the buffer, if data exceeds 2bytes then the pushing of data in buffer will be optimized
    highWaterMark: 2,

    // compulsion: read() must be implemented i.e mentioning read(){} 
    read(){}

});

// listener when new data comes into the readable stream
readableStream.on('data',(chunk)=>{
    console.log('data in chunks: ', chunk); // ASCII code in hexadecimal
    console.log('data in string: ', chunk.toString());
});

// push new data to empty readable stream
// readableStream.push() returns true if the data is below highWaterMark else returns false i.e buffer size exceeds highWaterMark or equal to highWaterMark bytes size of buffer
// ⭐👀 now a/c to this boolean value the data can be handled acordingly or the stream can be paused
console.log(readableStream.push('Hello new data was pushed to readable stream'));