const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
  entry: './src/index.js',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			title: 'Dave',
			template:'src/index.html'
		})
	],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		clean: true
  },
	resolve: {
		alias: {
			'audio-worklet': path.resolve(__dirname, 'src/util/audio-worklet.js')
		}
	},
	module: {
		parser: {
			javascript: {
				worker: ['AudioWorklet from audio-worklet', '...']
			}
		},
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	experiments: {
		topLevelAwait: true
	}
};

