import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { useState } from 'react'
import ListOfLoans from '../components/List'
import LoanItem from '../components/List'




var List = dynamic(() => import('../components/List'),{
	ssr: false
})




function addLoan() {
	console.log("why")
					List.innerHTML += <LoanItem/>
					//ListOfLoans.push()
				}

export default function Home() {
  return (
<>
	
		<Head>
			<title> Loan Tool</title>
		</Head>
		
		<body>

			<h2>Loan comparison tool</h2>


			<List></List>
				
			
			
			<button onClick={addLoan()}>Add Loan</button>
			
			
			<script id="addLoan" async> 
				{
					List.innerHTML += "<div>Hello JavaScript!</div>"
				}
			</script>

		</body>
			
			
	
</>
  )
}

//ReactDOM.render(List, document.getElementById('root'));