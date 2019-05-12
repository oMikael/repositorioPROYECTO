const Articulo = require('../models/articulo')
const User = require('../models/user')

const createArticle = function(req, res) {
  const articulo = new Articulo(req.body)
  articulo.save().then(function() {
    return res.send(articulo)
  }).catch(function(error) {
    return res.status(400).send(error)
  })
}

const getAllArticles = function(req, res) {
  Articulo.find({}).then(function(articulos) {
    res.send(articulos)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const getAcrylics = function(req, res) {
  Articulo.find({type: "acrilico"}).then(function(articulos) {
    res.send(articulos)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const getCards = function(req, res) {
  Articulo.find({type: "carta"}).then(function(articulos) {
    res.send(articulos)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const getFoils = function(req, res) {
  Articulo.find({type: "foil"}).then(function(articulos) {
    res.send(articulos)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const getMarbled = function(req, res) {
  Articulo.find({type: "marbled"}).then(function(articulos) {
    res.send(articulos)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const getCart = function(req, res) {
  const _id = req.user._id
  User.findOne(_id).then(function(user) {
    console.log(user.cartArticles)
    Articulo.find({'_id': { $in: user.cartArticles}}).then(function(articles) {
      var userArticles = articles.filter(article => user.cartArticles.includes(article._id))
      var allUserArticles = []
      for (let i = 0; i < userArticles.length; i++) {
        var howManyOfThisArticle = user.cartArticles.filter(article => article == userArticles[i]._id).length
        for (let j = 0; j < howManyOfThisArticle; j++) {
          allUserArticles.push(userArticles[i])
        }
      }
      console.log(allUserArticles)
      res.send(allUserArticles)
    })
  })
}

const addToCart = function(req, res) {
  const _articleid = req.body.articleId
  const _userid = req.user._id
  Articulo.findOneAndUpdate({_id: _articleid}, {$inc: {stock: -1}}).catch(function(error) {
    res.status(500).send(error)
  })
  User.findOneAndUpdate({_id: _userid}, {$push: {cartArticles: _articleid}}).then(function(user) {
    res.send(user)
  }).catch(function(error) {
    res.status(500).send(error)
  })
}

const checkout = function(req, res) {
  const _id = req.user._id
  User.findOneAndUpdate({_id: _id}, {$set: {cartArticles: []}}).then(function(user) {
    res.send(user)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const deleteFromCart = function(req, res) {
  const _articleid = req.body.articleId
  const _userid = req.user._id

  Articulo.findOneAndUpdate({_id: _articleid}, {$inc: {stock: +1}}).catch(function(error) {
    res.status(500).send(error)
  })
  User.findOne({_id: _userid}).then(function(user) {
    // , {$pull: {cartArticles: _articleid}}).then(function(user) {
    var index = user.cartArticles.indexOf(_articleid)
    if (index > -1) {
      user.cartArticles.splice(index, 1);
    }
    user.save()
    res.send(user)
  }).catch(function(error) {
    res.status(500).send(error)
  })
}

module.exports = {
  createArticle: createArticle,
  getAllArticles: getAllArticles,
  getAcrylics: getAcrylics,
  getCards: getCards,
  getFoils: getFoils,
  getMarbled: getMarbled,
  getCart: getCart,
  addToCart: addToCart,
  checkout: checkout,
  deleteFromCart: deleteFromCart
}