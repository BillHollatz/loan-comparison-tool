import app from './firebase/clientApp'



import { getDatabase, ref, set , get, child} from "firebase/database";
const database = getDatabase();
export default function handeler(req,res) {
const db = getDatabase();
var userId = -1;
const name = req.body.username
const pass = req.body.pwd
get(child(ref(db),'numUsers')).then((snapshot) => {
	if(snapshot.exists()){
		var userId = snapshot.val();
		userId = userId + 1;
		set(ref(db, 'users/' + userId), {
    			username: name,
    			pass: pass
  		});
		set(ref(db, 'numUsers'),userId);
	}
	else{
		console.log('no num users');
	}
}).catch((error) => {
	console.error(error);
});

  
  

res.status(200).json('nice')
}

