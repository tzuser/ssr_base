import React,{Component} from 'react';
import * as Acts from '../actions/config'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class User extends Component{
  constructor(props){
    super(props)
    this.fetchData();
  }
  async fetchData(){
    console.log('用户')
    await this.props.getDataAct();
  }
  render(){
    let {data}=this.props;
    return <div>首页更改 {data}</div>
  }
}
const mapStateToProps=(state)=>({
  data:state.config.data
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  getDataAct:Acts.getData,
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(User)