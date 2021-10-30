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
	A = this.Ammount;
	while(this.Months.getTail().getEnd() > 0){
		this.Months.append(A);
		A = this.Months.getTail().getEnd();
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
ModifyMonth(IDstart, IDend,ExtraPayment,RepeatYearly) {
	this.Months.ModifyPayment(IDstart, IDend,ExtraPayment,RepeatYearly);
	
}

}

export default Loan
