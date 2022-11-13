> Streams & Buffers Intro

- used heavily in nodejs infra
- req (readable stream),res (writable stream) objects , child process , crypto module, fs module ....

- Streams have multipurpose use-case of transferring data be it audio/video or simple binary data.

> Core

- the idea is to break down data into chunks which is then passed via readable stream and stored into definate sized physical space in memeory called buffers and then transferred from buffers to the destination via writable streams.
- each of these chunks represent data in binary format

> Custom Streams

1. readable
2. writable
3. transform
