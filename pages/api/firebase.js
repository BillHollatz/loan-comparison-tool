import app from './firebase/clientApp'



import { getDatabase, ref, set } from "firebase/database";
const database = getDatabase();
export default function handeler(req,res) {
const userId = number(req.body.userId)
const name = req.body.name
const email = req.body.email
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email
  });

res.status(200).json('nice')
}

