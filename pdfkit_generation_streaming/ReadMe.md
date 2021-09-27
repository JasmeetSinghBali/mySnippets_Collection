> What is it all about? 💡

**Creating pdf server side and streaming this pdf to the client via REST endpoint**

> Dependency

- [x] npm i pdfkit

> help with pdfkit

**http://pdfkit.org/docs/guide.pdf**

> dev logs

- [x] generate pdf on the express server
- [x] directly stream to the client after pdf generation and not store in the file system

                        # snippet file structure
                        -routes
                            *index.js
                        -service
                            *pdf_generator.js
                        -index.js

                        # where the root index.js is the main entry point
                        # and pdf_generator a service that contains logic for pdf creation via pdfkit

> test it out🍳

- [x] clone the repo
- [x] npm install(make sure you are in the cloned repo root dir)
- [x] npm run start
- [x] go to localhost:5000/invoice
- [x] download the pdf and see it contents
