import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import React, { Component } from "react"
import { useState, useEffect } from 'react'
import ListOfLoans from '../components/List'
//import List from '../components/List'
import Link from 'next/link'
//import Loan from '../back end/classloan'

//var x = new Loan(1, 2, 3)
//console.log(x)

var List = dynamic(() => import('../components/List'),{
	ssr: false
})



export default function Home() {
	const Log = async event => {
		//event.preventDefault()
		
		const res = await fetch('/api/userData',
			{
				body: JSON.stringify({
					result: 'gib'
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		)
		const result = await res.json()
		console.log(result)
//return(result)
	};
useEffect(() => {
	Log();
});
  return (
<>
	
		<Head>
			<title> Loan Tool</title>
		</Head>
		
		
			<h2>Loan comparison tool</h2>


			<List></List>
				
			
			
			
			
			
			
			
			<h3>Login to save your loan comparisons</h3>
			<Link href='Login'>
			<button onClick="window.location.href='/Login'">Login</button>
			</Link>
			<Link href='Register'>
			<button onClick="window.location.href='/Register'">Register</button>
			</Link>
			
		
			
			
	
</>
  )
}

