const path=require('path');
const webpack=require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');//html生成
module.exports={
	entry: {
		main:path.join(__dirname,'./src/index.js'),
		//vendors:['react','react-redux']
	},
	output:{
		path: path.resolve(__dirname,'build'),
		publicPath: '/',
		filename:'[name].js',
		chunkFilename:'[name].[id].js'
	},
	optimization: {
	  runtimeChunk: {
	      name: "manifest"
	  },
	  splitChunks: {
	      cacheGroups: {
	          commons: {
	              test: /[\\/]node_modules[\\/]/,
	              name: "vendor",
	              chunks: "all"
	          }
	      }
	  }
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
						plugins: ['transform-decorators-legacy','transform-decorators']
					},
				}]
			}
		]
	},

	resolve:{
		extensions:['.js','.jsx','.less','.scss','.css'],
		modules: ['node_modules']
	},
	plugins:[
		new webpack.DefinePlugin({
		    'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
		    'process.env.RUN_ENV':JSON.stringify(process.env.RUN_ENV || 'dev')
		}),
		new HTMLWebpackPlugin({
			title:'Webpack配置',
			inject: true,
			filename: 'index.html',
			template: path.join(__dirname,'./index.ejs')
		}),
		/*new webpack.optimize.CommonsChunkPlugin({//公共组件分离
			  names: ['vendors', 'manifest']
		}),*/
	],
}
