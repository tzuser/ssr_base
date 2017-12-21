import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import config from './config'
const app=(state={app:'adda'},action)=>{
	switch(action.type){
		default:
			return state
	}
}
export default combineReducers({
	app,
	config,
	router:routerReducer,
})