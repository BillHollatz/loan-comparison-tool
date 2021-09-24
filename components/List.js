
var ListOfLoans = [1,2,3];
var i = 4;


function LoanItem(Id) {
	const calc = async event => {
		event.preventDefault()
		
		const res = await fetch('/api/LoanInputs',
			{
				body: JSON.stringify({
					Key: event.target.getAttribute('id'),
					Amount: event.target.Amount.value,
					Rate: event.target.Rate.value,
					Term: event.target.Term.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		)
		const result = await res.json()
		console.log(result)
		document.getElementById(result.Key + 'monthly').dangerouslySetInnerHTML = 23
	}
	
	
	
	
	return (
		<form onSubmit={calc} id={Id}>
			<label htmlFor="Loan amount">Loan amount $</label>
			<input id="Amount" name="Amount" type="number"  required />
			
			<label htmlFor="Intrest rate">Intrest rate</label>
			<input id="Rate" type="number" step="any" required />
			
			<label htmlFor="Loan term">Loan term length in years</label>
			<input id="Term" type="number"  required />
			
			<button id='a' type="submit">Calculate</button>
			
			<label id={Id + 'monthly'}></label>
		</form>
	)
}

function addLoan() {
					ListOfLoans.push(i)
					i = i+1
					console.log("loan from fumc")
				}

export default function List() {
	return(
		<ul>
			{ListOfLoans.map((item) => (
					
					LoanItem(item)
				))}	
				
			
		</ul>
	)
}