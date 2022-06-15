const {workerData, parentPort} = require('node:worker_threads')

// here synchronous heavy computation code can be written
// without blocking the "main thread"
parentPort.postMessage({hello:workerData})