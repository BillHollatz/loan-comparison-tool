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

}

export default Loan
