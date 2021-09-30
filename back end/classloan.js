class Loan {
constructor(Ammount, rate, term) {
this.Ammount = Ammount;
this.Rate = Rate;
this.Term = Term;
let C = this.rate/1200;
	this.MonthlyPayment =(this.Ammount*(C*(Math.pow(1+C,360))))/((Math.pow(1+C,360))-1);
	this.Months = new MonthList(this.Ammount,this.MonthlyPayment,C)
}
getMonthlyPayment: function(){
	return this.MonthlyPayment;
}
getAmmount: function(){
	return this.Ammount;
}
getRate: function() {
	return this.Rate;
}
getTerm : function() {
	return this.Term;
}

}
class MonthNode {
	const(data) {
this.data = data;
this.next = null;
	}		
}
