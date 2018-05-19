import React,{Component} from 'react';
import * as Acts from '../actions/config'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class User extends Component{
  constructor(props){
    super(props)
    if(typeof window==="object")this.fetchData();
  }
  async fetchData(){
    await this.props.getUserDataAct();
  }
  render(){
    let {data}=this.props;
    return <div>用户 {data}</div>
  }
}
const mapStateToProps=(state)=>({
  data:state.config.userData
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getUserDataAct:Acts.getUserData,
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(User)