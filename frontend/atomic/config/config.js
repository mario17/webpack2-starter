const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const myEntries = glob.sync("../atomic-js/components/*.js");
let myArray = [];

let extractJSFiles = (str)=>{
	const regex = /([^/]*(js))$/ ;
	let matchStr;
	if ((matchStr = regex.exec(str)) !== null){
		str = str.match(regex)[0]
		return str.replace(".js","")
	}
}

let reducer = myEntries.reduce((acc, item)=>{
	const name = extractJSFiles(item) 
	const slashStr = "./"
	const concatStr = slashStr.concat(item)
	acc[name] = concatStr;
	console.log(acc);
	return acc;
},{})

let map = myEntries.reduce((acc,item)=>{
	const name = extractJSFiles(item)
	const htmlScripts = new HtmlWebpackPlugin({chunks:[name], filename: `${name}.html`,template:'./modules/templates/empty.html'})
	acc.push(htmlScripts)
	return  acc
},[])

module.exports.reducer =  reducer;


