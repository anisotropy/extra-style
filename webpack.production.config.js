var webpack = require('webpack');

module.exports = {
	entry: __dirname + '/app/extra-style.js',
	output: {
		path: __dirname + '/build',
		filename: 'extra-style.min.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015'] } }
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	]
}
