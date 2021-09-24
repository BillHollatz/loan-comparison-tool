import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



export default function Login(){
	const Log = async event => {
		event.preventDefault()
		
		const res = await fetch('/api/Login',
			{
				body: JSON.stringify({
					username: event.target.username.value, 
					pwd: event.target.pwd.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		)
		const result = await res.json()
		console.log(result)
	}
	
	return(
	<>
		<h2>Loan comparison tool Login</h2>
		<form onSubmit={Log}>
			<label for="username">Username:</label><br/>
			<input type="text" id="username" name="username"/><br/>
			<label for="pwd">Password:</label><br/>
			<input type="password" id="pwd" name="pwd"/><br/><br/>
			<input type="submit" value="Submit"/>
		</form>
	</>
		
	
	)
}