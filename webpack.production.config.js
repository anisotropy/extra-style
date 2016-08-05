var webpack = require('webpack');
var config = require('./config.js');

module.exports = {
	entry: config.entry,
	output: {
		path: __dirname + '/build',
		filename: 'extra-style.js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	]
};
