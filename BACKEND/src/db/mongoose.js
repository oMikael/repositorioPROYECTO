const mongoose = require('mongoose')

if(process.env.NODE_ENV === 'production'){
	var connectionURL = process.env.connectionURL
} else {
	const secret = require('../config.js')
	var connectionURL = secret.connectionURL
	//mongodb+srv://admin1:1234@cluster0-skgbz.mongodb.net/test?retryWrites=true
	//mongodb+srv://admin:taquitos@cluster0-xg9bk.mongodb.net/clase?retryWrites=true
}

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
