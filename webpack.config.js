//var webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + '/app/bundle.js',
	output: {
		path: __dirname + '/test',
		filename: 'bundle.js'
	}
}
