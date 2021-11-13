import React, {Component} from "react";
import ReactDOM from "react-dom";

class ModificationItem extends Component{
	constructor(props){
		super(props)
		this.Start = (Math.round(props.Start * 100) / 100).toFixed(2);
		this.SP = (Math.round(props.SP * 100) / 100).toFixed(2);//standard pay
		this.MP = (Math.round(props.MP * 100) / 100).toFixed(2);//monthly pay
		this.MI = (Math.round(props.MI * 100) / 100).toFixed(2);//monthly intrest
		this.MPR =( Math.round(props.MPR * 100) / 100).toFixed(2);//principle
		this.End = (Math.round(props.End * 100) / 100).toFixed(2);
	}
	render() {
		return (
			<div className='row'>
				<p className='tab'>{this.Start}</p>
				<p className='tab'>{this.SP}</p>
				<p className='tab'>{this.MP}</p>
				<p className='tab'>{this.MI}</p>
				<p className='tab'>{this.MPR}</p>
				<p className='tab'>{this.End}</p>
			</div>
		)
	}
}

export default ModificationItem