//require the library
const mongoose=require('mongoose');

// connect to the database
//mongoose.connect('mongodb://localhost/Auth_Dev');
mongoose.connect('mongodb+srv://renubawage96:nxhkx5vYZp9YyrEM@authpro.70yaggh.mongodb.net/?retryWrites=true&w=majority');

// acquire the connection to check if it is successfully
const db=mongoose.connection;

// error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running the print the msg
db.once('open',function(){
    console.log('Successfully connected to a database');
})
