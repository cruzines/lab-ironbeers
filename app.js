const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs'); //letting express know we are using a template engine
app.set('views', path.join(__dirname, 'views'));
// app.use(express.static('views/images')); 
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:
  
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
      .then (beers => {
    res.render('beers',{beers});
  })
    .catch (err => {
      return 'Page not found';
    });
});


app.get('/beers/:id', (req, res) => {
  let id = req.params.id
  punkAPI.getBeer(id)
      .then (beers => {
    res.render('beer',{beers});   
  })
    .catch (err => {
      return 'Page not found';
    });
});


app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
      .then (beers => {
    res.render('random-beer',{beers});   
  })
    .catch (err => {
      return 'Page not found';
    });
});



app.get('*', (req, res) => {
  res.send('Page not found')
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
