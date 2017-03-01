const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const express = require('express');
const formError = require('./errors').formError
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  const data = jsonfile.readFileSync('./users.json');
  res.send(data.users);
});

app.post('/users', (req, res) => {
  if (formError(req.body)) {
    res.send("error with data")
  } else {
    const file = './users.json'
    const obj = jsonfile.readFileSync(file);
    obj.users.push(req.body);
    jsonfile.writeFileSync(file, obj)
    const data = jsonfile.readFileSync(file);
    res.send(data.users);
  }
})

app.listen(3000, function () {
  console.log('Application running on port 3000!');
});
