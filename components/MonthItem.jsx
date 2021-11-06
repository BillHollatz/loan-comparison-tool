import React, {Component} from "react";
import ReactDOM from "react-dom";

class ModificationItem extends Component{
	constructor(props){
		super(props)
		this.Start = (Math.round(props.Start * 100) / 100).toFixed(2);
		this.SP = (Math.round(props.SP * 100) / 100).toFixed(2);
		this.MP = (Math.round(props.MP * 100) / 100).toFixed(2);
		this.MI = (Math.round(props.MI * 100) / 100).toFixed(2);
		this.MPR =( Math.round(props.MPR * 100) / 100).toFixed(2);
		this.End = (Math.round(props.End * 100) / 100).toFixed(2);
	}
	render() {
		return (
			<div className='row'>
				<p className='bord'>{this.Start}</p>
				<p className='bord'>{this.SP}</p>
				<p className='bord'>{this.MP}</p>
				<p className='bord'>{this.MI}</p>
				<p className='bord'>{this.MPR}</p>
				<p className='bord'>{this.End}</p>
			</div>
		)
	}
}

export default ModificationItem