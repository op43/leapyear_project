
const request = require('request')
const _  = require('lodash')
const Q = require('q')

const request_promise = Q.nfbind(request)


let getCurrency = (currencyName) => {
	let upper = _.toUpper(currencyName)

	let url = 'https://min-api.cryptocompare.com/data/price?fsym='+upper+'&tsyms=USD'
	return request_promise(url)
	.then((res)=>{
		let output = JSON.parse(res[1])
		if (output['Response'])
			throw 'invalid currencyName'
		output['name'] = _.toUpper(currencyName)
		return output
	}).catch((err)=>{
		console.log(err)
		return {}
	})
}


export default getCurrency