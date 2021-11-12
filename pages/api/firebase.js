import app from './firebase/clientApp'



import { getDatabase, ref, set } from "firebase/database";
const database = getDatabase();
export default function handeler(req,res) {
const data = req.body.data
const name = req.body.username
  const db = getDatabase();
  set(ref(db, 'users/' + name + '/data'), data);

res.status(200).json('nice')
}

