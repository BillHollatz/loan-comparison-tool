export default function handler(req, res) {
	const Key = req.body.Key
	const Amount = req.body.Amount
	const Rate = req.body.Rate
	const Term = req.body.Term
	res.status(200).json({Key, Amount, Rate, Term })
}