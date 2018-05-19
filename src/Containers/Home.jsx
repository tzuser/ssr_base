import React,{Component} from 'react';
import * as Acts from '../actions/config'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Test from './Test';

class Home extends Component{
  constructor(props){
    super(props)
    //console.log(props);
    if(typeof window==="object")this.fetchData();
  }
  async fetchData(){
    await this.props.getDataAct();
  }
  render(){
    let {data}=this.props;
    return <div>首页 {data} <Test/></div>
  }
}
const mapStateToProps=(state)=>({
  data:state.config.data
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getDataAct:Acts.getData,
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Home)