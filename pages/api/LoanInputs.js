
import Loan from './backend/classloan'


export default function handler(req, res) {
	const Key = req.body.Key
	const Amount = req.body.Amount
	const Rate = req.body.Rate
	const Term = req.body.Term
	let x = new Loan(Amount, Rate, Term)
	res.status(200).json({Key, x})
}