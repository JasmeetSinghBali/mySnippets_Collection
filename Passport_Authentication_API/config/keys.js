//store the mongoose url to connect to the database here
//Replace the <adminname> ,<passwordforadminuser> and <DBname> A/c To Your Credentials For Your MonogDbAtlas Account.
//this URI Can Be Found When U Connect Your Application With MongoDBAtlas.
dbPassword= 'mongodb+srv://<adminname>:<passwordforadminuser>@cluster0.ajz47.mongodb.net/<DBname>?retryWrites=true&w=majority';

module.exports={
	MongoURI: dbPassword
}
