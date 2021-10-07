import React, {Component} from "react";
import ReactDOM from "react-dom";

var ListOfLoans = [1,2,3];
var i = 4;


class LoanItem extends Component {
	constructor(props){
		super(props)
		this.Id = props.ID;
		this.button = <button id='a' type="submit">Calculate</button>
		this.state = {
			monthly: null
		};
		this.calc = async event => {
			event.preventDefault()
		
			const res = await fetch('/api/LoanInputs',
				{
					body: JSON.stringify({
						Key: event.target.getAttribute('id'),
						Amount: event.target.Amount.value,
						Rate: event.target.Rate.value,
						Term: event.target.Term.value
					}),
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST'
				}
			)
			
			const result = await res.json()
			console.log(result)
			this.setState({
				monthly: "Monthly Payment: "+result.toString()
			})
			//ReactDOM.render(this.button , this.button);
		};
	}
	
	
	render() {
		return (
			<form onSubmit={this.calc} id={this.Id}>
				<label htmlFor="Loan amount">Loan amount $</label>
				<input id="Amount" name="Amount" type="number"  required />
				
				<label htmlFor="Intrest rate">Intrest rate</label>
				<input id="Rate" type="number" step="any" required />
				
				<label htmlFor="Loan term">Loan term length in years</label>
				<input id="Term" type="number"  required />
				
				{this.button}
				
				<label>{this.state.monthly}</label>
			</form>
		);
	}
}



export default function List() {
	return(
		<ul>
			{ListOfLoans.map((item) => (
					
					<LoanItem key={item}/>
				))}	
				
			
		</ul>
	)
}
/*
function LoanItem(Id) {
	var monthly = null
	//const item = 
	monthly = <label id={Id + 'monthly'}></label>
	const results = <div></div>
	ReactDOM.createPortal(monthly, results)
	const calc = async event => {
		event.preventDefault()
		
		const res = await fetch('/api/LoanInputs',
			{
				body: JSON.stringify({
					Key: event.target.getAttribute('id'),
					Amount: event.target.Amount.value,
					Rate: event.target.Rate.value,
					Term: event.target.Term.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		)
		const result = await res.json()
		console.log(result)
		monthly = <label id={Id + 'monthly'}>wow</label>
		ReactDOM.render(monthly , results);
	}
	
	
	
	
	return (
		<form onSubmit={calc} id={Id}>
			<label htmlFor="Loan amount">Loan amount $</label>
			<input id="Amount" name="Amount" type="number"  required />
			
			<label htmlFor="Intrest rate">Intrest rate</label>
			<input id="Rate" type="number" step="any" required />
			
			<label htmlFor="Loan term">Loan term length in years</label>
			<input id="Term" type="number"  required />
			
			<button id='a' type="submit">Calculate</button>
			
			
		</form>
	)
}

function addLoan() {
					ListOfLoans.push(i)
					i = i+1
					console.log("loan from fumc")
				}

export default function List() {
	return(
		<ul>
			{ListOfLoans.map((item) => (
					
					LoanItem(item)
				))}	
				
			
		</ul>
	)
}
*/