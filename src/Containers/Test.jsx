import React,{Component} from 'react';
import * as Acts from '../actions/config'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class Test extends Component{
  constructor(props){
    super(props)
    if(typeof window==="object")this.fetchData();
  }
  async fetchData(){
    await this.props.getTestDataAct();
  }
  render(){
    let {data}=this.props;
    return <div style={{background:'red'}}>子组件 {data}</div>
  }
}
const mapStateToProps=(state)=>({
  data:state.config.testData
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getTestDataAct:Acts.getTestData,
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Test)