
import Loan from './backend/classloan'


export default function handler(req, res) {
	const Key = Number(req.body.Key)
	const Amount = Number(req.body.Amount)
	const Rate = Number(req.body.Rate)
	const Term = Number(req.body.Term)
	const Mods = Array(req.body.Mods)
	let x = new Loan(Amount, Rate, Term)
	let y =  x.getMonthlyPayment()
	
	res.status(200).json(Key)
}