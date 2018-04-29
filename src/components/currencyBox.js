import React, { Component } from 'react'
import 'bulma/css/bulma.css'

import getCurrency from '../api'


// Box that displays currency name and price
// there is a refresh button that refreshes the price
// theres a 50s rate limit for consecutive calls
class CurrencyBox extends Component {
	constructor(props){
		super(props);

		this.getPrice = this.getPrice.bind(this)
		this.refresh = this.refresh.bind(this)

		this.state = {'name':this.props.currencyName,
		'price': this.getPrice(this.props.currencyName)};
	}

	getPrice(currencyName) {
		getCurrency(currencyName).then((res)=>{
	  		let price = res["USD"].toString()
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
			console.log(this.props.currencyName,this.state.name)
		}

		return (
			<div className="box ">
		      <p className="title is-5 ">CURRENCY: {this.props.currencyName}</p>
		      <p className="subtitle">$ {this.state.price} </p>
		      <a className="button" onClick={this.refresh}>Refresh </a>
		    </div>
		)
	}

}




export default CurrencyBox