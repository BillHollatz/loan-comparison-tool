
import Loan from './backend/classloan'


export default function handler(req, res) {
	const Key = Number(req.body.Key)
	const Amount = Number(req.body.Amount)
	const Rate = Number(req.body.Rate)
	const Term = Number(req.body.Term)
	const SM = Number(req.body.SM)
	const SY = Number(req.body.SY)
	const Mods = req.body.Mods
	var x = new Loan(Amount, Rate, Term)
	//////console.log(Mods)
	for(let i=0;i<Mods.length;i++){
		var SID = monthYear2ID(SM, SY, Number(Mods[i].SM), Number(Mods[i].SY));//////console.log(SID);
		var EID = monthYear2ID(SM, SY, Number(Mods[i].EM), Number(Mods[i].EY));//////console.log(EID);
		x.ModifyMonth(SID, EID, Number(Mods[i].Amount), Mods[i].Repeat)
	}
	var y = x.getEnd()
	
	res.status(200).json(x,y)
}

function monthYear2ID(SM, SY, month, year){
	var yearOffset = year-SY
	var monthOffset = month-SM
	return(12*yearOffset + monthOffset)
}

function ID2MonthYear(SM, SY, ID){
	
}

