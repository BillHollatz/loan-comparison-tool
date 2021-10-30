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

append(ammount){
	//console.log(this.size)
	const n = new Month(ammount,this.MonthlyPayment,this.C);
	if(this.size === 0){
		
		this.head = n;
		this.tail = n;
		console.log(this.tail)
	}
	else {
		//console.log('getend 3');
		//var left = this.tail.getEnd();
		const t = this.tail;
		this.tail = n;
		t.setNext(this.tail);
	}
	this.size++;
}
getHead() {
	return this.head;
}
getTail() {
	return this.tail;
}
ModifyPayment(IDstart, IDend,ExtraPayment,RepeatYearly) {
	begin = this.Head;
	if(RepeatYearly){
		while (begin.getID()% 12 < IDstart){
			begin = begin.getNext();
		}
		while (begin.getID()% 12 < IDend){
			begin.setExtraPayment(ExtraPayment)
			begin = begin.getNext();
		}
	}
	else{
		while (begin.getID() < IDstart){
			begin = begin.getNext();
		}
		while (begin.getID() < IDend){
			begin.setExtraPayment(ExtraPayment)
			begin = begin.getNext();
		}
	}
	while (begin.getID() != this.tail){
		begin.setExtraPayment(0)
		begin = begin.getNext();
	}
	
}
}

export default MonthList