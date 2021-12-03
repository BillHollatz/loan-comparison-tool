import app from './firebase/clientApp'



import { getDatabase, ref, set , get, child} from "firebase/database";
const database = getDatabase();
export default function handeler(req,res) {
const db = getDatabase();
var userId = -1;
const name = req.body.username
const pass = req.body.pwd
var result
get(child(ref(db),'numUsers')).then((snapshot) => {
	if(snapshot.exists()){
		var userId = snapshot.val();
		userId = userId + 1;
		result = {
    			userId: userId,
    			pass: pass,
				data: {
					0: {
						Ammount: 0,
						Rate: 0,
						StartM: 0,
						StartY: 0,
						Term: 0
					},
					1: {
						Ammount: 0,
						Rate: 0,
						StartM: 0,
						StartY: 0,
						Term: 0
					},
					2: {
						Ammount: 0,
						Rate: 0,
						StartM: 0,
						StartY: 0,
						Term: 0
					}
				}
  		}
		set(ref(db, 'users/' + name), result);
		set(ref(db, 'numUsers'),userId);
		//result = 'b';//snapshot.child(name);
	}
	else{
		console.log('no num users');
		result = 'no num users'
	}
	
	res.status(200).json({
		result: result,
		name: name
		});
}).catch((error) => {
	console.error(error);
	
});
}
