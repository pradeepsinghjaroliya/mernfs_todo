const express = require('express');
const mongoose = require('mongoose');
//adding routes
const path =require('path');
const config = require('config');

const app = express();

//bodyparser middleware
app.use(express.json());

const db = config.get('mongoURI');


mongoose.connect(db,{useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology:true})
        .then(()=>console.log("mongodb connected.."))
        .catch(err=>console.log(err));


 //routes
 app.use('/api/items',require('./routes/api/items'));       
 app.use('/api/users',require('./routes/api/users')); 
 app.use('/api/auth',require('./routes/api/auth')); 

 if(process.env.NODE_ENV === 'production'){
	//set static folder
	app.use(express.static('client/build'));
	
	app.get('*', (req,res) => {
	res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
	});
}

const port =process.env.PORT || 5000;
app.listen(port,()=> console.log(`server started on ${port}...`));