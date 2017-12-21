import React,{Component} from 'react';
class Bundle extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.load(this.props)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }
    load=(props)=>{
        this.setState({
            mod:null
        })
        props.load((mod) => {
            this.setState({
                mod:mod.default?mod.default:mod
            })
        })
    }
    render() {
        return this.props.children(this.state.mod || (()=><div>load</div>))
    }
}
const getComponent=(com)=>{
	return (props)=>(
	<Bundle load={com} >
		{(List) => <List  {...props} />}
	</Bundle>
	);
}
export default getComponent
