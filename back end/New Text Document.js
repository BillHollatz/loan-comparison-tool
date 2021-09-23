class Loan {
constructor(Ammount, rate, term) {
this.Ammount = Ammount;
this.rate = rate;
this.term = term;
}
getMonthlyPayment: Function(){
	let MonthRate = this.rate/1200;
	this.MonthlyPayment =(this.Ammount*(MonthRate*(Math.pow(1+MonthRate,360))))/((Math.pow(1+MonthRate,360))-1);
	return this.MonthlyPayment;
}
get 
}