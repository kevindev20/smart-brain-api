const handleSignin = (req,res, bcrypt, db) =>{
	db.select('hash').from('login')
	.where ('email','=',req.body.email)
	.then (data =>{
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		//console.log(isValid);
		if (isValid){
			return db.select('*').from('users')
					 .where ('email','=',req.body.email)
					 .then(user =>{ 
					 	res.json(user[0])
					 })
					 .catch(err => res.status(400).json('Unable to get user'))
		}else{
			res.status(400).json('Not found')
		}
	})
	.catch(err => res.status(400).json('Not found,Now What ?') )


	
}
module.exports ={
	handleSignin:handleSignin
}