import React,{Component} from 'react';
import * as Acts from '../actions/config'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class Test extends Component{
  constructor(props){
    super(props)
    this.fetchData();
  }
  async fetchData(){
    await this.props.getTestDataAct();
  }
  render(){
    let {data}=this.props;
    return <div style={{background:'red'}}>测试Test {data}</div>
  }
}
const mapStateToProps=(state)=>({
  data:state.config.testData
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getTestDataAct:Acts.getTestData,
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Test)