import React, {Component} from "react";
import ReactDOM from "react-dom";
import MonthItem from "./MonthItem";


var i = 4;

class ModificationItem extends Component{
	constructor(props){
		super(props)
		//console.log(props)
		this.Id = props.key;
		this.Amount=props.Amount;
		this.SM=props.SM;
		this.SY=props.SY;
		this.EM=props.EM;
		this.EY=props.EY;
		this.Repeat=props.Repeat;
	}
	
	render() {
		return (
			<ul id={this.Id} className="bord">
				<label htmlFor="Loan amount">Extra amount $</label>
				<input  type="number" defaultValue={this.Amount} required/>
				
				<ul>
					<label htmlFor="Loan start">from</label>
					<select id="monthS"  defaultValue={this.SM}required>
						<option value="0">January</option>
						<option value="1">Febuary</option>
						<option value="2">March</option>
						<option value="3">April</option>
						<option value="4">May</option>
						<option value="5">June</option>
						<option value="6">July</option>
						<option value="7">August</option>
						<option value="8">September</option>
						<option value="9">October</option>
						<option value="10">November</option>
						<option value="11">December</option>
					</select>
					<label htmlFor="Loan start">of (year)</label>
					<input id="yearS" type="number" defaultValue={this.SY} required />
				</ul>
				
				<ul>
					<label htmlFor="Loan start">until</label>
					<select id="monthE" defaultValue={this.EM} required>
						<option value="0">January</option>
						<option value="1">Febuary</option>
						<option value="2">March</option>
						<option value="3">April</option>
						<option value="4">May</option>
						<option value="5">June</option>
						<option value="6">July</option>
						<option value="7">August</option>
						<option value="8">September</option>
						<option value="9">October</option>
						<option value="10">November</option>
						<option value="11">December</option>
					</select>
					<label htmlFor="Loan start">of (year)</label>
					<input id="yearE" type="number" defaultValue={this.EY} required />
				</ul>
				
				<label htmlFor="repeat">Repeat yearly</label>
				<input id="repeat" type="checkbox" defaultChecked={this.Repeat} />
				
			</ul>
				
				
			
		);
	}
}

class LoanItem extends Component {
	constructor(props){
		super(props)
		this.Id = props.goog;
		//console.log(props);
		this.numMods = 0;
		this.button = <button goog='a' type="submit" onClick={this.calc}>Calculate</button>
		this.addMod = <button onClick={this.addModification}>Add Extra Payment</button>
		this.state = {
			monthly: null ,
			Mods: null
		};
		this.LoanObject = null;
		this.listOfModifications = []
		this.LMODS = []
		this.ListOfMonths = []
		this.addModification = async event =>{
			event.preventDefault()
			this.ModsDisplayed = true
			this.numMods = this.numMods + 1
			
			this.listOfModifications.push(<ModificationItem 
						key={this.numMods} 
						Amount={0}
						SM={0}
						SY={0}
						EM={0}
						EY={0}
						Repeat={0}
					/>)
			var m = this.state.monthly
			this.setState({
				monthly: m ,
				Mods: this.listOfModifications
			})
		};
		this.toggleMods = async event =>{
			event.preventDefault()
			
			
			
			if(this.ModsDisplayed){
				this.LMODS = []
				//console.log(event.target.nextElementSibling)
				var MODS = event.target.nextElementSibling
				//console.log(MODS)
				for (let i = 0; i<MODS.childElementCount; i++){
					this.LMODS.push({
						key : i,
						Amount: MODS.children[i].children[1].value,
						SM : MODS.children[i].children[2].children[1].value,
						SY : MODS.children[i].children[2].children[3].value,
						EM : MODS.children[i].children[3].children[1].value,
						EY : MODS.children[i].children[3].children[3].value,
						Repeat : MODS.children[i].children[5].checked
					})
				}
				var m = this.state.monthly
				var M = this.state.Months
				this.setState({
					monthly: m,
					Mods: null,
					Months: M
				})
			}else{
				this.listOfModifications = []
				var len = this.LMODS.length
				
				for (let i = 0; i<len; i++){
					this.listOfModifications.push(<ModificationItem 
						key={i} 
						Amount={this.LMODS[i].Amount}
						SM={this.LMODS[i].SM}
						SY={this.LMODS[i].SY}
						EM={this.LMODS[i].EM}
						EY={this.LMODS[i].EY}
						Repeat={this.LMODS[i].Repeat}
					/>)
				}
				console.log(this.listOfModifications)
				var m = this.state.monthly
				var M = this.state.Months
				this.setState({
					monthly: m,
					Mods: this.listOfModifications,
					Months: M
				})
			}
			this.ModsDisplayed = !this.ModsDisplayed
		}
		this.calc = async event => {
			event.preventDefault()
			if (this.ModsDisplayed){
				this.LMODS = []
				var MODS = event.target.children[9].children[0].children[1]
				console.log(MODS)
				for (let i = 0; i<MODS.childElementCount; i++){
					this.LMODS.push({
						key : i,
						Amount: MODS.children[i].children[1].value,
						SM : MODS.children[i].children[2].children[1].value,
						SY : MODS.children[i].children[2].children[3].value,
						EM : MODS.children[i].children[3].children[1].value,
						EY : MODS.children[i].children[3].children[3].value,
						Repeat : MODS.children[i].children[5].checked
					})
				}
			}
			console.log(this.LMODS)
			
			const res = await fetch('/api/LoanInputs',
				{
					body: JSON.stringify({
						Key: this.Id,
						Amount: event.target.Amount.value,
						Rate: event.target.Rate.value,
						Term: event.target.Term.value,
						SM : event.target.month.value,
						SY : event.target.year.value,
						Mods: this.LMODS
						
					}),
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST'
				}
			)
			
			const result = await res.json()
			this.LoanObject = result
			console.log(this.LoanObject)
			
			this.ListOfMonths = []
			var iter = this.LoanObject.Months.head
			//console.log(iter.Start.toString())
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
			
				var m= "Monthly Payment: "+this.LoanObject.MonthlyPayment.toString()
				var M= this.state.Mods
				
			
			if(this.MonthsDisplayed){
				this.setState({
					monthly: m,
					Mods: M,
					Months: null
				})
				this.setState({
					monthly: m,
					Mods: M,
					Months: this.ListOfMonths
				})
			}else{
				
				this.setState({
					monthly: m,
					Mods: M,
					Months: null
				})
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
		<div className="bord">
			<form onSubmit={this.calc} goog={this.Id}  className="list">
			
				<label htmlFor="Loan amount">Loan amount $</label>
				<input id="Amount" name="Amount" type="number"  required />
				
				<label htmlFor="Intrest rate">Intrest rate</label>
				<input id="Rate" type="number" step="any" required />
				
				<label htmlFor="Loan term">Loan term length in years</label>
				<input id="Term" type="number"  required />
				<ul>
					<label htmlFor="Loan start">Loan start month</label>
					<select id="month"  required>
						<option value="0">January</option>
						<option value="1">Febuary</option>
						<option value="2">March</option>
						<option value="3">April</option>
						<option value="4">May</option>
						<option value="5">June</option>
						<option value="6">July</option>
						<option value="7">August</option>
						<option value="8">September</option>
						<option value="9">October</option>
						<option value="10">November</option>
						<option value="11">December</option>
					</select>
					<label htmlFor="Loan start">year</label>
					<input id="year" type="number"  required />
				</ul>
				
				
				{this.button}
				
				
				
				<label>{this.state.monthly}</label>
				<div className="row">
					<div id="mods" className="col" >
						<button onClick={this.toggleMods}>Show/Hide Extra Payments</button>
						<ul>{this.state.Mods}</ul>
						<button onClick={this.addModification}>Add Extra Payment</button>
					</div>
					<div className="col" >
						<button onClick={this.toggleMonthList}>Detailed List of monthly payments</button>
						<ul>{this.state.Months}</ul>
						
					</div>
				</div>
				
				
		
			</form>
			</div>
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