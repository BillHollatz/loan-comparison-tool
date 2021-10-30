class Month{
constructor (Start, StandardPayment,C){
	this.Start = Start;
	this.StandardPayment = StandardPayment;
	this.MonthlyPayment = StandardPayment;
	this.MonthlyInterest = Start*C;
	this.MonthlyPrincipal = StandardPayment - this.MonthlyInterest;
	this.End = Start - this.MonthlyPrincipal;
}
setSart(start){
	this.Start = Start;
}
getStart(){
	return this.start
}
setID(id){
	this.ID = id;
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
	this.ExtraPayment = extra;
	this.MonthlyPayment = this.MonthlyPayment + extra;
	this.End = this.Start - this.MonthlyPayment;
	this.Next.setSart(this.End) 
}
getExtraPayment() {
	return this.ExtraPayment;
}
}

export default Month