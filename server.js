const express = require  ('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const register = require ('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');

const knex = require('knex');

	const db = knex({
	  client: 'pg',
	  connection: {
	    host : '127.0.0.1',
	    user : 'postgres',
	    password : 'dog',
	    database : 'smart_brain'
	  }
	})

app.use(bodyParser.json())
app.use(cors());

	// db.select('*').from('users')
	// .then (response => console.log(response))


const database ={
	users:[
		{
			id:'100',
			name:'fatuma',
			email:'fatuma@gmail.com',
			password:'leopard',
			entries:0,
			joined:new Date()
		},
		{
			id:'101',
			name:'Khadija',
			email:'Khadija@gmail.com',
			password:'cheetah',
			entries:0,
			joined:new Date()
		}
	]
}

app.get('/', (req,res) =>{
	res.json(database.users);
})

app.post('/register' ,(req,res) => {register.handleRegister(req, res, bcrypt, db)} )

app.post('/signin', (req,res) => {signin.handleSignin(req, res, bcrypt, db)})

app.get('/profile/:id',(req,res) =>{ profile.handleProfile(req, res, db)})

app.put('/image',(req,res) => {image.handleImage(req, res, db)})

app.post ('/imageurl',(req,res) =>{image.handleApiCall(req,res)} )


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`)
})


/*
	/root url  -- GET --->its working
	/signin -- POST  ---->success/fail
	/register -- POST  ----> current user
	/profile/:id -- GET ----> user of inputed id /Or Nothing
	/image -- PUT  ----> rank/entries



*/