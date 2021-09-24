export default function handler(req, res){
	const user = req.body.username
	const pass = req.body.pwd
		res.status(200).json({user, pass})
}