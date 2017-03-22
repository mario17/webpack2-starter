const { resolve,join } = require('path');
const fs = require('fs');
const validate  = require('webpack-validator');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env) => {
	const configWebpack = {
		entry:{ 
			'app': ['./app.js'],
			'vendor':['babel-polyfill']
		}
  		,
		output:{
			filename:'bundle.[name].js',
			path: resolve(__dirname, '../../src')
		},
		module: {
			loaders: [
				{	test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/ , query:{ presets: [["es2015",{modules: false}],"stage-2"]}	}
			]
		},
		devServer: {
			contentBase: join(__dirname, "../../src"),
			compress: true,
			port: 8800
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({name:'vendor', minChunks: 5}),
			new HtmlWebpackPlugin(),
		],
		resolve: {
			extensions: ['.js'],
			alias: {
				yosonjs: resolve(__dirname, 'bower_components/yosonjs/dist/yoson.js')
			}
		}
	}
	return  validate(configWebpack)
}

