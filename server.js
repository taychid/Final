// call the packages we need
// #1 Add express package to the app
var express = require('express');
// ===============================

var app = express();   
var cors = require('cors');       

// #2 Add body-parser package to the app
var bodyParser = require('body-parser');
// ===============================


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// #3 Serve static content in folder frontend
app.get('/', function (req, res) {
    res.render('frontend/index');
});
// ===============================


var port = process.env.PORT || 8080; 

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var products = require('./api');
router.get('/products', products.getAllProducts);
router.get('/products/:pid', products.getProductById);

// #4 Complete the routing for POST, PUT, DELETE
app.get('/api/products/:id', function(req, res){
    var id = req.params.id;
  Product.find({"_id":id},function(err, products){
    if (err) res.status(500).json(err);
    res.json(products);
  });
});
app.put('/api/products/:id', function (req, res){
    var id = req.params.id;
    var updateproduct = req.body;
    Product.findByIdAndUpdate(id, updateproduct, function(err){
      if (err) res.status(500).json(err);      
      res.json({status: "Update a product"});
    })
});

app.delete('/api/products/:id', function (req, res){
    var id = req.params.id;
    Product.findByIdAndRemove(id, function(err){
      if (err) res.status(500).json(err);      
      res.json({status: "product deleted  "});
    })
});
// ===============================


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', cors(), router);

// #10 Start the server

// ===============================
console.log('Magic happens on http://localhost:' + port);