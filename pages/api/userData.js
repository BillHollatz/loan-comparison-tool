//import app from './firebase/clientApp'

var data

export default function handeler(req,res) {
	if (JSON.stringify(req.body.result) === JSON.stringify("gib")){
		res.status(200).json({user: data});
	}
	else{
		data = req.body.result;
		res.status(200).json({re: 'OK'});
	}
	////console.log(data)
	//res.status(200).json(req.body.result);
}

