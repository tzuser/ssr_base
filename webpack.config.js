const path=require('path');
const webpack=require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');//html生成
module.exports={
	entry: {
		main:path.join(__dirname,'./src/index.js'),
		vendors:['react','react-redux']
	},
	output:{
		path: path.resolve(__dirname,'build'),
		publicPath: '/',
		filename:'[name].js',
		chunkFilename:'[name].[id].js'
	},
	context:path.resolve(__dirname,'src'),
	module:{
		rules:[
			{
				test:/\.(js|jsx)$/,
				use:[{
					loader:'babel-loader',
					options:{
						presets:['env','react','stage-0'],
					},
				}]
			}
		]
	},
	resolve:{extensions:['.js','.jsx','.less','.scss','.css']},
	plugins:[
		new HTMLWebpackPlugin({
			title:'Webpack配置',
			inject: true,
			filename: 'index.html',
			template: path.join(__dirname,'./index.ejs')
		}),
		new webpack.optimize.CommonsChunkPlugin({//公共组件分离
			  names: ['vendors', 'manifest']
		}),
	],
}
