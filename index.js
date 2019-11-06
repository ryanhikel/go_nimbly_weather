const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const request =  require('request');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/weather', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  // res.json(passwords);

  console.log(`Sent ${count} passwords`);

  let url = `https://www.metaweather.com/api/location/44418/`
  request(url, function (err, response, body) {
    if (err) {
      console.log(err);
    } else {
      res.json(JSON.parse(body));
      console.log(JSON.parse(body));
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

console.log(`Password generator listening on ${port}`);