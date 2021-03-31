Author->Jasmeet

Project->NodejsTask

Stack- Node.js,Express,MongoDB,Cloudinary.

Observation-The given time for the task was not sufficient. (1 day)

Major Packages Used-
----------------------
1.)@hapijoi for validation
2.)cloudinary to save and host the images online publicly accessible
3.)express(server code)
4.)jsonwebtoken for token generation and signature for protected routes.
5.)mongoose for mongodbAtlas interaction.
6.)multer and multer-storage-cloudinary for interaction with cloudinary and its configuration.

Features
-------------------------
1.)Doctor register and Login With jwt token return.
2.)Validation for both Patient and Doctor registeration.
3.)Add new Patient
4.)Protected routes Delete patient records and get patient photo. needs auth-token in header this jwt token is received when Doctor login route is hit.

Plus
-------------------------
Images are saved in cloudinary online free storage for multimedia, as the storing of images in mongodb not a good practice.

Not Implemented-
-----------------------
1.)Scheduler- lack of time. can be implemented by nodecron but i need more time.
2.)update and fetch Routes- need more time to implement them for session management for particular doctor updating records of patient.
3)database dump - need to assemble or manually create scripts to generate data
need more time to do this.
I am not familiar with unit testing and test cases practices.

How to make it work
--------------------------
1.)clone the repo and install the dependencies mentioned in Package.json.
2.)make a free account in mongodbAtlas and create a cluster, connect with the cluster select connect with your application and copy the url.
3.)fill the  .env in the root folder of the NodejsTask with the relevant values
for databaseurl(from mongodbatlas), token_secret(random) and cloudinary credentials.
4.)set the databaseurl to the copied url in the 2nd step in the .env file.
5.)run npm start in the terminal.
6.)use postman to test the api requests.
