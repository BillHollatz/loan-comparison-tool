class Month{
constructor (Start, StandardPayment,C){
	this.Start = Start;
	this.StandardPayment = StandardPayment;
	this.MonthlyPayment = StandardPayment;
	this.MonthlyInterest = Start*C;
	this.MonthlyPrincipal = StandardPayment - MonthlyInterest;
	this.End = Start - MonthlyPrincipal;
}
function setSart(start){
	this.Start = Start;
}
function getStart(){
	return this.start
}
function setID(id){
	this.ID = id;
}
function getID(){
	return this.ID;
}
function getEnd() {
	return this.End;
}
function getStandardPayment(){
	return this.StandardPayment;
}
function getExtraPayment(){
	return this.ExtraPayment;
}
function getMonthlyInterest(){
	return this.MonthlyInterest;
}
function getMonthlyPrincipal() {
	return this.MonthlyPrincipal;
}
function getNext() {
	return this.Next;
}
function getPrev() {
	return this.Prev;
}
function setExtraPayment(extra) {
	this.ExtraPayment = extra;
	this.MonthlyPayment = this.MonthlyPayment + extra;
	this.End = this.Start - this.MonthlyPayment;
	this.Next.setSart(this.End) 
}
function getExtraPayment() {
	return this.ExtraPayment;
}
}