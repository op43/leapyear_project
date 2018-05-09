import React, { Component } from 'react'
import 'bulma/css/bulma.css'

import axios from 'axios'


// Box that displays currency name and price
// Refresh button retreives latest updated currency price
// from server.js
class CurrencyBox extends Component {
	constructor(props){
		super(props);

		this.getPrice = this.getPrice.bind(this)
		this.refresh = this.refresh.bind(this)

		this.state = {'name':this.props.currencyName,
		'price': this.getPrice(this.props.currencyName)};
	}

	getPrice(currencyName) {
	 	let apiCall = 'http://localhost:5000/currency/'+currencyName
	 	axios.get(apiCall).then((res)=>{
	 		let price = res.data["USD"].toString()
	  		let tempState = {'name':this.props.currencyName}
	  		tempState['price'] = price
	  		this.setState(tempState)
	  	}).catch((err)=>{
	  		console.log(err)
	  	})
	}

	refresh() {
		this.getPrice(this.props.currencyName)
	}


	render() {
		if(this.state.name !== this.props.currencyName){
			this.refresh()
		}

		return (
			<div className="box ">
		      <p className="title is-5 ">CURRENCY: {this.props.currencyName}</p>
		      <p className="subtitle">$ {this.state.price} </p>
		      <a className="button" onClick={this.refresh}>
		      	Refresh
			  </a>
		    </div>
		)
	}

}




export default CurrencyBox