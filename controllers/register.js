const handleRegister = (req, res, bcrypt, db) =>{
    const saltRounds = 10;
	const {name,email,password} = req.body;
	const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    if(!name || !email || !password){
    	return res.json('Failed to register. Please try again.')
    }
    db.transaction(trx => {
    	trx.insert({
    		email:email,
    		hash:hash
    	})
    	.into('login')
    	.returning('email')
    	.then(loginEmail =>{
    		return  trx('users')
					.returning('*')
					.insert(
						{
							name: name,
							email:loginEmail[0],
							joined:new Date()
						}
					)
					.then(user =>res.json(user[0]))
					.catch(err => res.status(400).json(err))
    	})
    	.then(trx.commit)
        .catch(trx.rollback)
    })
.catch(err => res.status(400).json('Unable to register'))
}

module.exports ={
    handleRegister:handleRegister
}