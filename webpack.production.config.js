var webpack = require('webpack');

module.exports = {
	entry: __dirname + '/app/extra-style.js',
	output: {
		path: __dirname + '/build',
		filename: 'extra-style.min.js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	]
}
