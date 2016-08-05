var config = require('./config.js');

module.exports = {
	devtool: 'eval-source-map',
	entry: config.entry,
	output: {
		path: __dirname + '/build',
		filename: 'extra-style.js'
	}
};
