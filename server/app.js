const app = require('express')()
const firebase = require('./firebase')
const port = 5000

const _  = require('lodash')
const cors = require('cors')
const axios = require('axios')

let db = firebase.database()



let updateCurrency = (currencyName) => {

	let url = 'https://min-api.cryptocompare.com/data/price?fsym='+currencyName+'&tsyms=USD'
	return axios.get(url)
	.then((res)=>{
		let output = res.data
		if (output['Response'])
			throw new Error("invalid currency code")
		output['name'] = currencyName
		return output
	}).catch((err)=>{
		console.log(err)
		return {}
	})
}


app.use(cors())


app.get('/',(req,res)=>{
	db.ref('/').once('value').then( (snapshot) => {
		let dbStructure = snapshot.val()
		res.status(200).send(dbStructure)
	})
})


app.get('/currency', (req,res) =>{
	db.ref('/test').once('value').then( (snapshot) => {
		currencies = _.keys(snapshot.val())
		res.status(200).send(currencies)
	})

})


app.put('/currency/:name', (req, res) => {
	let symbol = _.toUpper(req.params.name)
	updateCurrency(symbol)
	.then((currency)=>{
		if(currency == {}){
			res.status(400).send('invalid coin symbol')
		}
		else{
			db.ref('/test/'+symbol).set(currency)
			res.status(200).send('updating db with symbol ' + symbol)
		}	
	})
	
});



app.delete('/currency/:name', (req, res) => {
	let symbol = _.toUpper(req.params.name)
	
	db.ref('/test/'+symbol).set(null)
	
	res.status(200).send('removing symbol ' + symbol)		
});




app.get('/currency/:name', (req, res) => {
	let symbol = _.toUpper(req.params.name)
	db.ref('/test/'+symbol).once('value').then( (snapshot) => {
		price = snapshot.val()
		res.status(200).send(price)
	})

});



// Goes through all currencies being tracked and updates them
let poll = () => {
	db.ref('/test').once('value').then( (snapshot) => {
		currencies = _.keys(snapshot.val())
		currencies.forEach((symbol) => {
			updateCurrency(symbol)
			.then((currency)=>{
				db.ref('/test/'+symbol).set(currency)
				console.log('polled '+symbol)
			})
		})
	})
}


// Poll every 11 seconds because of the 10s rate limit
setInterval(()=>{ poll()}, 11000)



app.listen(port, () => console.log(`Listening on port ${port}`))
