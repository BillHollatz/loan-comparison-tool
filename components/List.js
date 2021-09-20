
var ListOfLoans = [<LoanItem/>];



function LoanItem() {
	const calc = async event => {
		event.preventDefault()
		
		const res = await fetch('/api/LoanInputs',
			{
				body: JSON.stringify({
					Amount: event.target.Amount.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		)
		const result = await res.json()
	}
	
	
	
	console.log("create Loan");
	return (
		<form onSubmit={calc}>
			<label htmlFor="Loan amount">Loan amount</label>
			<input id="Loan amount" name="Amount" type="text"  required />
			
			<label htmlFor="Intrest rate">Intrest rate</label>
			<input id="Intrest rate" type="text"  required />
			
			<label htmlFor="Loan term">Loan term length in years</label>
			<input id="Loan term" type="text"  required />
			
			<button type="submit">Calculate</button>
		</form>
	)
}

function addLoan() {
					ListOfLoans.push(<LoanItem/>)
					console.log("loan from fumc")
				}

export default function List() {
	return(
		<ul>
			{ListOfLoans.map((item) => (
					item
				))}	
				
			
		</ul>
	)
}