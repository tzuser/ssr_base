export const GET_DATA='GET_DATA';
export const GET_TEST_DATA='GET_TEST_DATA';
export const GET_USER_DATA='GET_USER_DATA';
export const getData=()=>async (dispatch,getState)=>{
  await new Promise((resolve)=>setTimeout(resolve,1000));
  console.log('首页请求数据')
  dispatch({type:GET_DATA,data:"首页数据"});
}


export const getTestData=()=>async (dispatch,getState)=>{
  await new Promise((resolve)=>setTimeout(resolve,200));
  console.log('子组件请求数据')
  dispatch({type:GET_TEST_DATA,data:"子组件数据"});
}


export const getUserData=()=>async (dispatch,getState)=>{
  await new Promise((resolve)=>setTimeout(resolve,200));
  console.log('用户请求数据')
  dispatch({type:GET_USER_DATA,data:"用户数据"});
}