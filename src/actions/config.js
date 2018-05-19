export const GET_DATA='GET_DATA';
export const GET_DATA_TEST='GET_DATA_TEST';
export const getData=()=>async (dispatch,getState)=>{
  await new Promise((resolve)=>setTimeout(resolve,1000));
  console.log('首恶首页首页')
  dispatch({type:GET_DATA,data:"这是请求到的数据"});
}


export const getTestData=()=>async (dispatch,getState)=>{
  await new Promise((resolve)=>setTimeout(resolve,200));
  console.log('测试测试测试')
  dispatch({type:GET_DATA_TEST,data:"测试子组件的数据"});
}