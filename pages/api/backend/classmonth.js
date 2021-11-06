class Month{
constructor (Start, StandardPayment,C, id){
	this.Start = Start;
	this.StandardPayment = StandardPayment;
	this.MonthlyPayment = StandardPayment;
	this.ExtraPayment = 0;
	this.MonthlyInterest = Start*C;
	this.MonthlyPrincipal = StandardPayment - this.MonthlyInterest;
	this.End = Start - this.MonthlyPrincipal;
	this.ID = id
}
setStart(start){
	this.Start = start;
}
getStart(){
	return this.Start;
}
getID(){
	return this.ID;
}
getEnd() {
	return this.End;
}
getStandardPayment(){
	return this.StandardPayment;
}
getExtraPayment(){
	return this.ExtraPayment;
}
getMonthlyInterest(){
	return this.MonthlyInterest;
}
getMonthlyPrincipal() {
	return this.MonthlyPrincipal;
}
setNext(item){
	this.Next = item;
}
getNext() {
	return this.Next;
}
getPrev() {
	return this.Prev;
}
setExtraPayment(extra) {
	this.ExtraPayment = this.ExtraPayment + extra;
	this.MonthlyPayment = this.MonthlyPayment + extra;
	this.End = this.Start - this.MonthlyPayment;
	if(this.Next != null){
		this.Next.setStart(this.End);
	}
}
getExtraPayment() {
	return this.ExtraPayment;
}
}

export default Month