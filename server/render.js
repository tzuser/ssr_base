import React from 'react'
import Loadable from 'react-loadable';
import { renderToString } from 'react-dom/server';
import App from '../src/Containers/App.jsx';
import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
import { StaticRouter } from 'react-router-dom'
import createServerStore from './store';
import {Provider} from 'react-redux';
import path from 'path';
import fs from 'fs';
import Helmet from 'react-helmet';
import { getBundles } from 'react-loadable/webpack'
import stats from '../build/react-loadable.json';
import {getDataFromTree} from 'fetch-initial-data';
//html处理
const prepHTML=(data,{html,head,style,body,script,css,state})=>{
	data=data.replace('<html',`<html ${html}`);
	data=data.replace('</head>',`${head}${style}</head>`);
	data=data.replace('<body>',`<body><script>window._INIT_STATE_ = ${JSON.stringify(state)}</script>`);
	data=data.replace('<div id="root"></div>',`<div id="root">${body}</div><style id="jss-server-side">${css}</style>`);
	data=data.replace('</body>',`${script}</body>`);
	return data;
}

const render=async (ctx,next)=>{
		const filePath=path.resolve(__dirname,'../build/index.html')
		let html=await new Promise((resolve,reject)=>{
			fs.readFile(filePath,'utf8',async (err,htmlData)=>{//读取index.html文件
				if(err){
					console.error('读取文件错误!',err);
					return res.status(404).end()
				}
				//获取store
				const { store, history } = createServerStore(ctx.req.url);

				let modules=[];

				const AppRender=(
					<Loadable.Capture report={moduleName => modules.push(moduleName)}>
						<Provider store={store}>
							<ConnectedRouter history={history}>
								<App/>
							</ConnectedRouter>
						</Provider>
					</Loadable.Capture>
				)
				await getDataFromTree(AppRender);
				let state=store.getState();
				let routeMarkup =renderToString(AppRender)

				let bundles = getBundles(stats, modules);
				let styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
				let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

				let styleStr=styles.map(style => {
					        	return `<link href="/dist/${style.file}" rel="stylesheet"/>`
					      	}).join('\n')

				let scriptStr=scripts.map(bundle => {
					        	return `<script src="/${bundle.file}"></script>`
					      	}).join('\n')

				const helmet=Helmet.renderStatic();
				const html=prepHTML(htmlData,{
					html:helmet.htmlAttributes.toString(),
					head:helmet.title.toString()+helmet.meta.toString()+helmet.link.toString(),
					style:styleStr,
					body:routeMarkup,
					script:scriptStr,
					state
				})
				resolve(html)
			})
		})
		ctx.body=html;//返回
}

export default render;