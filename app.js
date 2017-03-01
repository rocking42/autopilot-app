const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const express = require('express');
// Import form error handling
const formError = require('./errors').formError;
const app = express();
const port = 3000;
// Middlewares for reading the request body
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Read data from JSON and display it to the user
app.get('/users', (req, res) => {
	const data = jsonfile.readFileSync('./users.json');
	res.send(data.users);
});
// Update JSON file provided correct form data is given
app.post('/users', (req, res) => {

	if (formError(req.body)) {
		res.status(403).send('error with form data');
	} else {
		const file = './users.json';
		const obj = jsonfile.readFileSync(file);
		obj.users.push(req.body);
		jsonfile.writeFileSync(file, obj);
		const data = jsonfile.readFileSync(file);
		res.send(data.users);
	}
});

app.listen(port, function () {
	console.log(`Application running on port ${port}`);
});
