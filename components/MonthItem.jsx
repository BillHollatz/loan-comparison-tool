import React, {Component} from "react";
import ReactDOM from "react-dom";

class ModificationItem extends Component{
	constructor(props){
		super(props)
		this.Start = props.Start
	}
	render() {
		return (
			<>
				<p>{this.Start}</p>
			</>
		)
	}
}

export default ModificationItem