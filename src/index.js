import 'babel-polyfill';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//浏览器开发工具
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers/index';

import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
import {  Router } from 'react-router-dom';
import Loadable from 'react-loadable';


const history = createHistory()
const middleware=[thunk,routerMiddleware(history)];
//首次数据
let initialState=window._INIT_STATE_ || {};
const store=createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
	)
if(module.hot) {
		module.hot.accept('./reducers/index.js', () => {
			import('./reducers/index.js').then(({default:nextRootReducer})=>{
				store.replaceReducer(nextRootReducer);
			});
		});
		module.hot.accept('./Containers/App.jsx', () => {
			console.log('fff')
			render(store)
		});
	}
const renderDOM=process.env.NODE_ENV=='production'?ReactDOM.hydrate:ReactDOM.render;
const render=()=>{
	const App = require("./Containers/App.jsx").default;
	renderDOM(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>,
		document.getElementById('root'))
}

window.main = () => {
  Loadable.preloadReady().then(() => {
	render()
  });
};
