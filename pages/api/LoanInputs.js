
import Loan from './backend/classloan'


export default function handler(req, res) {
	const Key = Number(req.body.Key)
	const Amount = Number(req.body.Amount)
	const Rate = Number(req.body.Rate)
	const Term = Number(req.body.Term)
	let x = new Loan(Amount, Rate, Term)
	let y =  x.getMonthlyPayment()
	res.status(200).json(y)
}