import React, {Component} from "react";
import ReactDOM from "react-dom";
import MonthItem from "./MonthItem";

var i = 4;

class ModificationItem extends Component{
	constructor(props){
		super(props)
		console.log(props)
		this.Id = props.ID;
	}
	
	render() {
		return (
			<ul id={this.Id}>
				<label htmlFor="Loan amount">Extra amount $</label>
				<input id="Amount" name="Amount" type="number"  required />
				
				<ul>
					<label htmlFor="Loan start">from</label>
					<select id="monthS"  required>
						<option value="January">January</option>
						<option value="Febuary">Febuary</option>
						<option value="March">March</option>
						<option value="April">April</option>
						<option value="May">May</option>
						<option value="June">June</option>
						<option value="July">July</option>
						<option value="August">August</option>
						<option value="September">September</option>
						<option value="October">October</option>
						<option value="November">November</option>
						<option value="December">December</option>
					</select>
					<label htmlFor="Loan start">of (year)</label>
					<input id="yearS" type="number"  required />
				</ul>
				
				<ul>
					<label htmlFor="Loan start">until</label>
					<select id="monthE"  required>
						<option value="January">January</option>
						<option value="Febuary">Febuary</option>
						<option value="March">March</option>
						<option value="April">April</option>
						<option value="May">May</option>
						<option value="June">June</option>
						<option value="July">July</option>
						<option value="August">August</option>
						<option value="September">September</option>
						<option value="October">October</option>
						<option value="November">November</option>
						<option value="December">December</option>
					</select>
					<label htmlFor="Loan start">of (year)</label>
					<input id="yearE" type="number"  required />
				</ul>
				
				<label htmlFor="repeat">Repeat yearly</label>
				<input id="repeat" type="checkbox"  />
				
			</ul>
				
				
			
		);
	}
}

class LoanItem extends Component {
	constructor(props){
		super(props)
		this.Id = props.goog;
		console.log(props);
		this.numMods = 0;
		this.button = <button goog='a' type="submit" onClick={this.calc}>Calculate</button>
		this.addMod = <button onClick={this.addModification}>Add Extra Payment</button>
		this.state = {
			monthly: null ,
			Mods: null
		};
		this.LoanObject = null;
		this.listOfModifications = []
		this.ListOfMonths = []
		this.addModification = async event =>{
			event.preventDefault()
			
			this.numMods = this.numMods + 1
			
			this.listOfModifications.push(<ModificationItem key={this.numMods}/>)
			var m = this.state.monthly
			this.setState({
				monthly: m ,
				Mods: this.listOfModifications
			})
		};
		this.calc = async event => {
			
			event.preventDefault()
			var LMODS = []
			var MODS = event.target.children[9]
			for (let i = 0; i<MODS.childElementCount; i++){
				LMODS.push({
					key : i,
					Amount: MODS.children[i].children[1].value,
					SM : MODS.children[i].children[2].children[1].value,
					SY : MODS.children[i].children[2].children[3].value,
					EM : MODS.children[i].children[3].children[1].value,
					EY : MODS.children[i].children[3].children[3].value,
					Repeat : MODS.children[i].children[5].checked
				})
			}
			console.log(MODS)
			
			const res = await fetch('/api/LoanInputs',
				{
					body: JSON.stringify({
						Key: this.Id,
						Amount: event.target.Amount.value,
						Rate: event.target.Rate.value,
						Term: event.target.Term.value,
						Mods: LMODS
						
					}),
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST'
				}
			)
			
			const result = await res.json()
			this.LoanObject = result.x
			console.log(this.LoanObject)
			this.setState({
				monthly: "Monthly Payment: "+this.LoanObject.MonthlyPayment.toString() ,
				Mods: this.listOfModifications
			})
			var iter = this.LoanObject.Months.head
			console.log(iter.Start.toString())
			while(iter != null){
				this.ListOfMonths.push(
					<MonthItem 
						Start= {iter.Start.toString()} 
						SP = {iter.StandardPayment.toString()} 
						MP = {iter.MonthlyPayment.toString()} 
						MI = {iter.MonthlyInterest.toString()} 
						MPR={iter.MonthlyPrincipal.toString()} 
						End={iter.End.toString()}
					/>
				)
				iter = iter.Next
			}
		};
		
		this.toggleMonthList = async event =>{
			event.preventDefault()
			
			this.MonthsDisplayed = !this.MonthsDisplayed
			if(this.MonthsDisplayed){
				var m = this.state.monthly
				var M = this.state.Mods
				this.setState({
					monthly: m,
					Mods: M,
					Months: this.ListOfMonths
				})
			}else{
				var m = this.state.monthly
				var M = this.state.Mods
				this.setState({
					monthly: m,
					Mods: M,
					Months: null
				})
			}
		}
	}
	
	
	render() {
		return (
			<form onSubmit={this.calc} goog={this.Id}>
			
				<label htmlFor="Loan amount">Loan amount $</label>
				<input id="Amount" name="Amount" type="number"  required />
				
				<label htmlFor="Intrest rate">Intrest rate</label>
				<input id="Rate" type="number" step="any" required />
				
				<label htmlFor="Loan term">Loan term length in years</label>
				<input id="Term" type="number"  required />
				<ul>
					<label htmlFor="Loan start">Loan start month</label>
					<select id="month"  required>
						<option value="1">January</option>
						<option value="Febuary">Febuary</option>
						<option value="March">March</option>
						<option value="April">April</option>
						<option value="May">May</option>
						<option value="June">June</option>
						<option value="July">July</option>
						<option value="August">August</option>
						<option value="September">September</option>
						<option value="October">October</option>
						<option value="November">November</option>
						<option value="December">December</option>
					</select>
					<label htmlFor="Loan start">year</label>
					<input id="year" type="number"  required />
				</ul>
				
				
				{this.button}
				
				<button onClick={this.toggleMonthList}>Detailed List of monthly payments</button>
				
				<label>{this.state.monthly}</label>
				<ul id="mods">{this.state.Mods}</ul>
				<ul>{this.state.Months}</ul>
				<button onClick={this.addModification}>Add Extra Payment</button>
				
		
			</form>
		);
	}
}


class Lis extends Component {
	constructor(props){
		super(props)
		this.numLoans = 3;
		this.ListOfLoans = [<LoanItem key='1' goog='1'/>,<LoanItem key='2' goog='2'/>,<LoanItem key='3' goog={this.numLoans}/>];
		this.state = {
			Loans: this.ListOfLoans
		};
		this.addLoan = async event =>{
			event.preventDefault()
			
			this.numLoans = this.numLoans + 1
			//console.log(this.numLoans)
			this.ListOfLoans.push(<LoanItem key={this.numLoans} goog={this.numLoans.toString()}/>)
			
			var x = [...this.ListOfLoans]
			this.setState({
				Loans: x
			})
			
			
		};
	}
	render(){
		return(
			<ul>				
				{this.state.Loans}
				<button onClick={this.addLoan}>Add Loan</button>
			</ul>
		)
	}
}

export default function List() {
	return(
		<Lis/>
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