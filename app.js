// We will declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const userlist = require('./controllers/userlist');
const messagelist = require('./controllers/messagelist');
const inbox = require('./controllers/inbox');
const outbox = require('./controllers/outbox');
const sendmail = require('./controllers/sendmail');
const loginpage = require('./controllers/loginpage');


//Connect mongoose to our database
mongoose.connect(config.database);

//Declaring Port
const port = 3000;

//Initialize our app variable
const app = express();

//Middleware for CORS
app.use(cors());

//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/', (req,res) => {
	res.send("Invalid page");
});

app.use('/userlist',userlist);

app.use('/messagelist',messagelist);

app.use('/inbox',inbox);

app.use('/outbox',outbox);

app.use('/sendmail',sendmail);

app.use('/loginpage',loginpage);


//Listen to port 3000
app.listen(port, () => {
	console.log(`Starting the server at port ${port}`);
});
