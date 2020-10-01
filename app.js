var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(process.env.PORT || 3000);
  
const mercadopago = require ('mercadopago');

mercadopago.configure({
  access_token: 'TEST-6511441310885867-100114-9c8c7cb674ad2a36d54d6452810ea089-346810035'
});

let preference = {
    items: [
      {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };
  
  mercadopago.preferences.create(preference)
  .then(function(response){
    global.id = response.body.id;
  }).catch(function(error){
    console.log(error);
  });