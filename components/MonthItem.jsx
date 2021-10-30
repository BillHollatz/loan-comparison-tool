import React, {Component} from "react";
import ReactDOM from "react-dom";

class ModificationItem extends Component{
	constructor(props){
		super(props)
		this.start = props.Start
	}
	render() {
		return (
			<>
				<p>{this.start}</p>
			</>
		)
	}
}

export default ModificationItem