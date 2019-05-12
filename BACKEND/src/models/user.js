const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

if(process.env.NODE_ENV === 'production'){
  var secretkey = process.env.APIKEY
}else{
  const secret = require('../config.js')
  var secretkey = secret.secret
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if ( value < 13 ) {
        throw new Error('Debes ser mayor de 13 años')
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email invalido')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  cartArticles: {
    type: [String]
  }
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true 
  }
})

// una relacion entre dos Schemas, no lo guarda, es virtual 
userSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'createdBy'
})

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}


// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });
//   if( !user ) {
//     throw new Error('User does not exist');
//   }
//   const match = await bcrypt.compare(password, user.password);
//   if (match) {
//     return user
//   } 
//   throw new Error('Wrong password!');
// }

userSchema.statics.findByCredentials = function(email, password) {
  return new Promise( function(resolve, reject) {
    User.findOne({ email }).then(function(user) {
      if( !user ) {
        return reject('User does not exist')
      }
      bcrypt.compare(password, user.password).then(function(match) {
        if(match) {
          return resolve(user)
        } else {
          return reject('Wrong password!')
        }
      }).catch( function(error) {
        return reject('Wrong password!')
      })
    })
  })
}

userSchema.methods.generateToken = function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, secretkey, { expiresIn: '7 days'})
  user.tokens = user.tokens.concat({ token })
  return new Promise(function( resolve, reject) {
    user.save().then(function(user){
      return resolve(token)
    }).catch(function(error) {
      return reject(error)
    })
  })
}

userSchema.pre('save', function(next) {
  const user = this
  if( user.isModified('password') ) {
    bcrypt.hash(user.password, 8).then(function(hash){
      user.password = hash
      next()
    }).catch(function(error){
      return next(error)
    })
  } else {
    next()  
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

