import MonthList from './classmonthlist'
class Loan {
constructor(Ammount, Rate, Term) {
	this.Ammount = Ammount;
	this.Rate = Rate;
	this.Term = Term;
	
	let C = Rate/1200;
	this.x = Math.pow(1+C,Term*12);
	this.MonthlyPayment =(Ammount*(C*(Math.pow(1+C,Term*12))))/((Math.pow(1+C,Term*12))-1);
	this.Months = new MonthList(this.Ammount,this.MonthlyPayment,C)
	var A = this.Ammount;
	this.Months.append(A);
	//////console.log('getend 1')
	while(this.Months.getTail().getEnd() > 0){
		//////console.log('getend 2')
		A = this.Months.getTail().getEnd();
		this.Months.append(A);
	}
	
}
getMonthlyPayment(){
	return this.MonthlyPayment;
}
getAmmount(){
	return this.Ammount;
}
getRate() {
	return this.Rate;
}
getTerm() {
	return this.Term;
}
getEnd(){
	return(this.Months.getTail().getID());
}
ModifyMonth(IDstart, IDend,ExtraPayment,RepeatYearly) {
	this.Months.ModifyPayment(IDstart, IDend,ExtraPayment,RepeatYearly);
	
}

}

export default Loan
