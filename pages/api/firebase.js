import app from './firebase/clientApp'



import { getDatabase, ref, set } from "firebase/database";
const database = getDatabase();
export default function handeler(req,res) {
var userId = 0
var name = 'hi'
var email = 'hi2'
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email
  });

res.status(200).json('nice')
}

