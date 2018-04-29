import React, { Component } from 'react'
import 'bulma/css/bulma.css'

import getCurrency from '../api'



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
	  		// console.log(tempState)
	  		this.setState(tempState)
	  	}).catch((err)=>{
	  		console.log(err)
	  		alert('Cant get price');
	  		return 'Failed to get price'
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
		      <p className="title is-3 ">CURRENCY: {this.props.currencyName}</p>
		      <p className="subtitle">$ {this.state.price} </p>
		      <a className="button" onClick={this.refresh}>Refresh </a>
		    </div>
		)
	}

}




export default CurrencyBox