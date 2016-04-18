var webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + '/app/extra-style.js',
	output: {
		path: __dirname + '/test',
		filename: 'extra-style.dev.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015'] } }
		]
	}
}
