import React, {Component} from "react";
import ReactDOM from "react-dom";

class ModificationItem extends Component{
	constructor(props){
		super(props)
		this.Start = props.Start
		this.SP = props.SP
		this.MP = props.MP
		this.MI = pros.MI
		this.MPR = props.MPR
		this.End = props.End
	}
	render() {
		return (
			<>
				<p>{this.Start}</p>
				<p>{this.SP}</p>
				<p>{this.MP}</p>
				<p>{this.MI}</p>
				<p>{this.MPR}</p>
				<p>{this.End}</p>
			</>
		)
	}
}

export default ModificationItem