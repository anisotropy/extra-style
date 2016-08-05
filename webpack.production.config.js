var webpack = require('webpack');

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
