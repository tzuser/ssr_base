import {GET_DATA,GET_DATA_TEST} from '../actions/config';
const config=(state={config:'5',data:null,testData:null},action)=>{
	switch(action.type){
    case GET_DATA:
      return Object.assign({},state,{data:action.data});
    case GET_DATA_TEST:
      return Object.assign({},state,{testData:action.data});
		default:
			return state
	}
}
export default config