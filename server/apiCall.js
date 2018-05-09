
const request = require('request')
const _  = require('lodash')
const Q = require('q')

const request_promise = Q.nfbind(request)


let currency = (currencyName) => {
	let upper = _.toUpper(currencyName)

	let url = 'https://min-api.cryptocompare.com/data/price?fsym='+upper+'&tsyms=USD'
	return request_promise(url)
	.then((res)=>{
		let output = JSON.parse(res[1])
		if (output['Response'])
			throw new Error("invalid currency code")
		output['name'] = _.toUpper(currencyName)
		return output
	}).catch((err)=>{
		console.log(err)
		return {}
	})
}
