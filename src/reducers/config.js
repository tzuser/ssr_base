import {GET_DATA,GET_TEST_DATA,GET_USER_DATA} from '../actions/config';
const config=(state={config:'5',data:null,testData:null,userData:null},action)=>{
	switch(action.type){
    case GET_DATA:
      return Object.assign({},state,{data:action.data});
    case GET_TEST_DATA:
      return Object.assign({},state,{testData:action.data});
    case GET_USER_DATA:
      return Object.assign({},state,{userData:action.data});
		default:
			return state
	}
}
export default config