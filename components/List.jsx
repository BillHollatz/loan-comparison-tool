import React, {Component} from "react";
import { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import MonthItem from "./MonthItem";
//import { useBeforeunload } from 'react-beforeunload';

var i = 4;

class ModificationItem extends Component{
	constructor(props){
		super(props)
		//////console.log(props)
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
		//////console.log(props);
		this.Id = props.goog;
		if(typeof props.data === 'undefined' || props.data === null){//start a loan with default values if none are passed in
			this.data = {
				Ammount: 0,
				Rate: 0,
				Term: 0,
				StartM: 0,
				StartY: 0,
				mods: []
			}
			this.ModsDisplayed = false
		}else{
			this.data = props.data;
			this.ModsDisplayed = true
		}			
		this.listOfModifications = []
		for(var i in this.data.mods){
			var mod = this.data.mods[i]
			//////console.log(mod)
			this.listOfModifications.push(<ModificationItem 
						key={this.numMods} 
						Amount={mod.extra}
						SM={mod.SM}
						SY={mod.SY}
						EM={mod.EM}
						EY={mod.EY}
						Repeat={mod.repeat}
					/>)
		}

		
		this.numMods = this.listOfModifications.length;
		this.button = <button goog='a' type="submit" onClick={this.calc}>Calculate</button>
		this.addMod = <button onClick={this.addModification}>Add Extra Payment</button>
		this.state = {
			monthly: null ,
			Mods: this.listOfModifications
		};
		this.LoanObject = null;
		this.LMODS = []
		this.ListOfMonths = []
		
		//adds a modification field to the loan object
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
			var t = this.state.total
			this.setState({
				monthly: m ,
				total: t,
				Mods: this.listOfModifications
			})
		};
		
		//hides or unhides the list of modifications
		this.toggleMods = async event =>{
			event.preventDefault()
			
			
			
			if(this.ModsDisplayed){
				this.LMODS = []
				//////console.log(event.target.nextElementSibling)
				
				//list of mods is the next element after the toggle button
				var MODS = event.target.nextElementSibling
				//////console.log(MODS)
				
				//collect the modification data for storage
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
				var t = this.state.total
				this.setState({
					monthly: m,
					total: t,
					Mods: null,
					Months: M
				})
			}else{
				this.listOfModifications = []
				var len = this.LMODS.length
				
				for (let i = 0; i<len; i++){//for each modification saved, send the data to a new modification field on the page
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
				//////console.log(this.listOfModifications)
				var m = this.state.monthly
				var M = this.state.Months
				var t = this.state.total
				this.setState({
					monthly: m,
					total: t,
					Mods: this.listOfModifications,
					Months: M
				})
			}
			this.ModsDisplayed = !this.ModsDisplayed
		}
		
		
		//sends loan data to the back end to calculate monthly payment, total paid and the detailed list of months
		this.calc = async event => {
			event.preventDefault()
			
			
			if (this.ModsDisplayed){
				this.LMODS = []
				var MODS = event.target.children[9].children[0].children[1]
				//////console.log(MODS)
				for (let i = 0; i<MODS.childElementCount; i++){
					var s =MODS.children[i].children[2].children[3].value
					var e = MODS.children[i].children[3].children[3].value
					var r =MODS.children[i].children[5].checked
					if (s!=e){
						r = false
					}
					this.LMODS.push({
						key : i,
						Amount: MODS.children[i].children[1].value,
						SM : MODS.children[i].children[2].children[1].value,
						SY : s,
						EM : MODS.children[i].children[3].children[1].value,
						EY : e,
						Repeat : r
					})
				}
			}
			//////console.log(this.LMODS)
			
			
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
			//////console.log(this.LoanObject)
			
			this.ListOfMonths = [<div className='row' key='0'>
				<p className='tab'>Start value</p>
				<p className='tab'>Standard Payment</p>
				<p className='tab'>Extra Payment</p>
				<p className='tab'>Interest</p>
				<p className='tab'>Principal paid</p>
				<p className='tab'>End value</p>
			</div>]
			var iter = this.LoanObject.Months.head
			//////console.log(iter.Start.toString())
			
			//for each month in the loan term, increment the total paid
			var totalPaid = 0;
			while(iter != null && iter.Start > 0){
				//if the end of the loan is reached remove negative values on the list of months, and make sure the standard payment is only enough to finish the loan
				if(iter.End <0){
					totalPaid = totalPaid + iter.Start +iter.MonthlyInterest
					iter.MonthlyPayment = iter.Start + iter.MonthlyInterest
					iter.MonthlyPrincipal = iter.Start
					//if the last month is not paid off by the standard payment, the extra payment for this month should only be just enough to end the loan
					if(!(iter.Start > iter.StandardPayment)){
						iter.StandardPayment = iter.Start + iter.MonthlyInterest
					}
					iter.End = 0
				}
				else{//if the end of the loan is not reached, increment the total paid
					totalPaid = totalPaid + iter.MonthlyPayment+iter.MonthlyInterest
				}
				
				//push the above calculated values to the detailed list of monthly payments
				this.ListOfMonths.push(
					<MonthItem 
						Start= {iter.Start.toString()} 
						SP = {iter.StandardPayment.toString()} 
						MP = {(iter.MonthlyPayment-iter.StandardPayment).toString()} 
						MI = {iter.MonthlyInterest.toString()} 
						MPR={iter.MonthlyPrincipal.toString()} 
						End={iter.End.toString()}
					/>
				)
				iter = iter.Next
			}
			
			//update the text displaying the standard monthly payment and total paid
				var m= "Monthly Payment: "+this.LoanObject.MonthlyPayment.toString()
				var M= this.state.Mods
				var t= " Total Paid: "+totalPaid
			
			if(this.MonthsDisplayed){
				this.setState({
					monthly: m,
					total: t,
					Mods: M,
					Months: null
				})
				this.setState({
					monthly: m,
					total: t,
					Mods: M,
					Months: this.ListOfMonths
				})
			}else{
				
				this.setState({
					monthly: m,
					total: t,
					Mods: M,
					Months: null
				})
			}
		};
		
		//hide or unhide the detailed list of monthly payments
		this.toggleMonthList = async event =>{
			event.preventDefault()
			var m = this.state.monthly
		    var M = this.state.Mods
			var t = this.state.total
			this.MonthsDisplayed = !this.MonthsDisplayed
			if(this.MonthsDisplayed){
				
				this.setState({
					monthly: m,
					total: t,
					Mods: M,
					Months: this.ListOfMonths
				})
			}else{
				
				this.setState({
					monthly: m,
					total: t,
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
				<input id="Amount" name="Amount" type="number" defaultValue={this.data.Ammount} required />
				
				<label htmlFor="Intrest rate">Intrest rate</label>
				<input id="Rate" type="number" step="any" defaultValue={this.data.Rate} required />
				
				<label htmlFor="Loan term">Loan term length in years</label>
				<input id="Term" type="number" defaultValue={this.data.Term} required />
				<ul>
					<label htmlFor="Loan start">Loan start month</label>
					<select id="month" defaultValue={this.data.StartM} required>
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
					<input id="year" type="number" defaultValue={this.data.StartY} required />
				</ul>
				
				
				{this.button}
				
				
				
				<label>{this.state.monthly}{this.state.total}</label>
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

//Lis component, contains the list of loan objects to be displayed on the page
class Lis extends Component {
	constructor(props){
		super(props)
		this.numLoans = 3;
		this.ListOfLoans = [<LoanItem key='1' goog='1'/>,<LoanItem key='2' goog='2'/>,<LoanItem key='3' goog={this.numLoans}/>];
		
		
		
		this.state = {
			Loans: this.ListOfLoans
		};
		
		//Creates a new loan object and adds it to the list of loans
		this.addLoan = async event =>{
			event.preventDefault()
			
			this.numLoans = this.numLoans + 1
			//////console.log(this.numLoans)
			this.ListOfLoans.push(<LoanItem key={this.numLoans} goog={this.numLoans.toString()}/>)
			
			var x = [...this.ListOfLoans]
			this.setState({
				Loans: x
			})
			
			
		};
		
		//checks the userData api for the login information of a user
		//updates the list of loans if there is a user logged in
		this.Log = async event => {
			//event.preventDefault()
			
				const res = await fetch('/api/userData',
					{
						body: JSON.stringify({
							result: 'gib'
						}),
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'POST'
					}
				)
				const result = await res.json()
				//////console.log(result)
				if (!(typeof result.user === 'undefined' || result.user === null)) {
					this.username = result.user.name
					this.ListOfLoans = []
					var loans = result.user.result.data
					//////console.log(loans)
					for(var loan in loans){
						//////console.log(loans[loan])
						this.ListOfLoans.push(<LoanItem 
						key={loan+1}
						goog={(parseInt(loan)+1).toString()}
						data = {loans[loan]}
						/>)
					}
					this.setState({
						Loans: this.ListOfLoans
					})
				}
			
		
			
		};
	
		//save loans button, sends loan data to the database
		this.save = async event =>{
			var loans = []
			for(var i=1; i<this.numLoans+1; i++){
				var a = document.querySelectorAll('[goog="'+i.toString()+'"]');//search the document for the loan of number i
				//////console.log(a[0])
				//a[0].toggleMods
				
				//each piece of data is refrenced as children of the loan object
				var Ammount = a[0].children[1].value
				var Rate = a[0].children[3].value
				var Term = a[0].children[5].value
				var StartM = a[0].children[6].children[1].value
				var StartY = a[0].children[6].children[3].value
				var m = a[0].children[9].children[0].children[1]
				var mods = []
				for(var j=0; j<m.childElementCount; j++){
					var extra = m.children[j].children[1].value
					var SM = m.children[j].children[2].children[1].value
					var SY = m.children[j].children[2].children[3].value
					var EM = m.children[j].children[3].children[1].value
					var EY = m.children[j].children[3].children[3].value
					var repeat = m.children[j].children[5].checked
					mods.push({
						extra: extra,
						SM: SM,
						SY: SY,
						EM: EM,
						EY: EY,
						repeat: repeat
					})
				}
				loans.push({
					Ammount: Ammount,
					Rate: Rate,
					Term: Term,
					StartM: StartM,
					StartY: StartY,
					mods: mods
				})
			}
				
			//alert("Hello! I am an alert box!!");
			
			//send the data collected from all the loans to the api
			fetch('/api/firebase',
				{
					body: JSON.stringify({
						data: loans,
						username: this.username
					}),
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST'
				}
			)
			/*
			useEffect(() => {
		  const unloadCallback = (event) => {
			event.preventDefault();
			
			
			
			event.returnValue = "";
			return "";
		  };

		  window.addEventListener("beforeunload", unloadCallback);
		  return () => window.removeEventListener("beforeunload", unloadCallback);
		}, []);*/
		}
	}
	render(){
		//check if there is a logged in user
		if ((typeof this.username === 'undefined' || this.username === null)) {
			this.Log();
		}
		
		return(
			<ul >				
				{this.state.Loans}
				<button onClick={this.addLoan}>Add Loan</button>
				<button onClick={this.save}>Save Loans</button>
			</ul>
		)
	}
}





export default function List() {
	return(
		<Lis/>
	)
}
