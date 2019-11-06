const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request =  require('request');
const app = express();

// Serve static files from the React app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/weather/:location', (req, res) => {
  let city = req.params.location;
  let locationSearch = `https://www.metaweather.com/api/location/search/?query=${city}`;
  request(locationSearch, function (err, response, body) {
    if (err && JSON.parse(body)[0]) {
      console.log(err);
    } else {
      let woeid = JSON.parse(body)[0].woeid;
      let url = `https://www.metaweather.com/api/location/${woeid}/`
      console.log(url);
      request(url, function (err, response, body) {
        if (err) {
          console.log(err);
        } else {
          res.json(JSON.parse(body));
        }
      });
    }
  });
  
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Weather App listening on ${port}`);