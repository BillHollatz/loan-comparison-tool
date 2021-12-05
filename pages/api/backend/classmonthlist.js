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
	//////console.log(this.size)
	const n = new Month(ammount,this.MonthlyPayment,this.C, this.size);
	if(this.size === 0){
		
		this.head = n;
		this.tail = n;
		//////console.log(this.tail)
	}
	else {
		//////console.log('getend 3');
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
	var begin = this.head;
	
	if(RepeatYearly){
		//////console.log('r');
		while (begin != this.tail){
			//////console.log(begin.ID);
			//////console.log(begin.ID%12);
			//////console.log(IDend);
			while (begin.ID% 12 < IDstart){
				begin.setExtraPayment(0)
				if(begin.End < 0){
					this.tail = begin;
					delete(begin.Next);
					break
				}else{
					begin = begin.getNext();
				}
			}
			while (begin.ID% 12 <= IDend){//////console.log('o');
				begin.setExtraPayment(ExtraPayment)
				begin = begin.getNext();
			}
			while(begin.ID%12 > 0){
				begin.setExtraPayment(0)
				if(begin.End < 0){
					this.tail = begin;
					delete(begin.Next);
					break
				}else{
					begin = begin.getNext();
				}
			}
		}
	}
	else{
		//////console.log('e');
		while (begin.ID < IDstart){
			
			begin = begin.getNext();
		}
		while (begin.ID <= IDend){////console.log('m');
			begin.setExtraPayment(ExtraPayment)
			begin = begin.getNext();
		}
	}
	while (begin != this.tail){
		begin.setExtraPayment(0)
		if(begin.End < 0){
			this.tail = begin;
			delete(begin.Next);
		}else{
			begin = begin.getNext();
		}
	}
	
}
}

export default MonthList