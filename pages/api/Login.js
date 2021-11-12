import app from './firebase/clientApp'



import { getDatabase, ref, set , get, child} from "firebase/database";
const database = getDatabase();
export default function handeler(req,res) {
const db = getDatabase();

const name = req.body.username
const pass = req.body.pwd
var result;
get(child(ref(db), '/users/')).then((snapshot) => {
	if(snapshot.exists()){
		var snap = snapshot.val()
		var userId = snapshot.child(name).child("userId")
		var userPass = snapshot.child(name).child("pass")
		if(JSON.stringify(userPass) === JSON.stringify(pass)){
			result = snapshot.child(name);
			
		}
		else{
			result = 'Login info not correct'
		}
		
		
	}
	else{
		result = 'Login info not correct'
	}
	res.status(200).json({
		result: result,
		name: name
		});
}).catch((error) => {
	console.error(error);
	res.status(200).json({error: error});
});


  


}

