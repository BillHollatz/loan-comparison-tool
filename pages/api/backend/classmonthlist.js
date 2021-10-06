import Month from './classmonth'
class MonthList {
	constructor(Ammount,MonthlyPayment,C){
		this.head = null;
		this.tail = null;
		this.size = 0;
		this.Ammount = Ammount;
		this.MonthlyPayment = MonthlyPayment;
		this.C = C;
	}

append(){
	left = this.tail.getEnd();
	const n = new Month(this.Ammount,this.MonthlyPayment,this.C);
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
getHead() {
	return this.Head;
}
getTail() {
	this.Tail;
}
ModifyPayment(IDstart, IDend,ExtraPayment) {
	begin = this.Head;
	while (begin.getID() < IDstart){
		begin = begin.getNext();
	}
	while (begin.getID() < IDend){
		begin.setExtraPayment(ExtraPayment)
		begin = begin.getNext();
	}
	while (begin.getID() != this.tail){
		begin.setExtraPayment(0)
		begin = begin.getNext();
	}
	
}
}

export default MonthList