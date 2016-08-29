const { resolve, join } = require('path')
const fs = require('fs')
const validate  = require('webpack-validator')
/*var req = require.context('./', true, /Spec\.js$/);*/
let ExtractTextPlugin = require("extract-text-webpack-plugin")
let PathRewriterPlugin = require("webpack-path-rewriter")



module.exports = env => {
	console.log(env.prod);
	//settings entry points
/*	console.log(fs.readdir());*/
	console.log(require.context,'xd');
	let entry = ['./js/app.js', "./jade/index.jade"];

	if(env.dev)  entry.push('webpack-dev-server/client?http://localhost:8080/');

	return  validate({
		context : resolve(__dirname,'src'),
		entry:entry,
		output:{
			filename:'bundle.js',
			path:resolve(__dirname, '../backend/public/dist'),
			pathinfo: !env.prod
		},
		devServer:{
		        contentBase: '../backend/public'
		},
		devtool: env.prod ? 'source-map': 'eval',
		bail: env.prod,
		module:{
		    	loaders:[
		      		{
					test: /\.(js|jsx)?$/,
					include: [  resolve(__dirname, 'js') ],
					loaders: [ 'babel?presets[]=es2015']
		      		},
		      		{
		      			test: /\.jade$/,
	      				/*name: "../[name].html"*/
					loader: PathRewriterPlugin.rewriteAndEmit({
						name: '[name].html',
						loader: 'jade-html?' + JSON.stringify({ pretty: true })
					})
		      		}
			]
		},
		plugins: [
			new PathRewriterPlugin()
		],
		resolve:{
			extensions: ['', '.js', '.json', '.jsx'],
		}
	})
}
