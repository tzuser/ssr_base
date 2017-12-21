import React,{Component} from 'react';
import {Route,Link} from 'react-router-dom';
import Loadable from 'react-loadable';

const loading=()=><div>Loading...</div>;

const LoadableHome=Loadable({
	loader:()=> import(/* webpackChunkName: 'Home' */ './Home'),
	loading
});

const LoadableUser = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './User'),
  loading
});

const LoadableList = Loadable({
  loader: () => import(/* webpackChunkName: 'List' */ './List'),
  loading
});


class App extends Component{
	render(){
		return(
			<div>
				<Route exact path="/"  component={LoadableHome}/>
				<Route path="/user" component={LoadableUser}/>
				<Route path="/list" component={LoadableList}/>

				<Link to="/user">user</Link>
				<Link to="/list">list</Link>
			</div>
		)
	}
};
export default App