class Loan {
const(Ammount, rate, term) {
this.Ammount = Ammount;
this.Rate = Rate;
this.Term = Term;
}
getMonthlyPayment: function(){
	let MonthRate = this.rate/1200;
	this.MonthlyPayment =(this.Ammount*(MonthRate*(Math.pow(1+MonthRate,360))))/((Math.pow(1+MonthRate,360))-1);
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
class MonthList {
	const(){
		this.head = null;
		this.tail = null;
		this.size = 0;
	}
}
append(Jan){
	const n = new MonthNode(Jan);
	if(this.size === 0){
		this.head = n;
		this.tail = n;
	}
	else {
		const t = this.tail;
		this.tail = n;
	t.next = this.tail;
	}
	this.size++;
}