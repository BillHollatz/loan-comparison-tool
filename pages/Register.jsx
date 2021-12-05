import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



export default function Login(){
	const Log = async event => {
		event.preventDefault()
		
		const res = await fetch('/api/Register',
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
		////console.log(result)
		const res2 = await fetch('/api/userData',
			{
				body: JSON.stringify({
					result: result
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		)
		const result2 = await res2.json()
		////console.log(result2)
		window.location.href='/'
	}
	
	return(
	<>
		<h2>Loan comparison tool Register User</h2>
		<p>Please Note: this login is not secured, do not use a password from another service</p>
		<form onSubmit={Log}>
			<label htmlFor="username">Username:</label><br/>
			<input type="text" id="username" name="username"/><br/>
			<label htmlFor="pwd">Password:</label><br/>
			<input type="text" id="pwd" name="pwd"/><br/><br/>
			<input type="submit" value="Submit"/>
		</form>
	</>
		
	
	)
}