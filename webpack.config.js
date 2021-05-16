const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClosurePlugin = require('closure-webpack-plugin');

module.exports = {
	mode: 'development',
  entry: './src/index.js',
	devServer: {
		contentBase: './dist',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Development',
			template:'src/index.html'
		})
	],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
		clean: true
  },
	optimization: {
		minimizer: [
			new ClosurePlugin({mode: 'STANDARD'}, {
				// compiler flags here
				//
				// for debugging help, try these:
				//
				// formatting: 'PRETTY_PRINT'
				// debug: true,
				// renaming: false
			})
		]
	}
};

