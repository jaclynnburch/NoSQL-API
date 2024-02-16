const http = require('http');
const app = require('./app');
const users = require('./routes/users');
const thoughts = require('./routes/users');
require('./models/thought');
require('./models/user');

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
	console.log(`Server runnng on ${PORT}`);
});