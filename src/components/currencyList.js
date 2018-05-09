import React, { Component } from 'react'
import 'bulma/css/bulma.css'

import axios from 'axios'

import AddCurrency from './addCurrency.js' 
const _  = require('lodash')


// Menu to hold currency list
// the currency list contains buttons to change
// the currently viewed currency and also delete buttons 
// for added currencies
class CurrencyList extends Component {
	constructor(props){
		super(props);

		let initialize = JSON.parse(sessionStorage.getItem('currencies') || '[]')

		this.state = {'currencies': initialize}

		this.defaultCurrencies = ['BTC','ETH']

		this.addCurrency = this.addCurrency.bind(this)
		this.removeCurrency = this.removeCurrency.bind(this)
		this.changeCurrency = this.changeCurrency.bind(this)
		this.getCurrencyList = this.getCurrencyList.bind(this)
	}


	renderList(currencies) {

		let defaultItems = this.defaultCurrencies.map((curr) =>
		<li key={curr}>
			<div className="field is-grouped">
			  <p className="control">
			    <a className="button" onClick={()=>{this.changeCurrency({'currency':curr})}}>
			      {curr}
			    </a>
			  </p>
			</div>
			<p />	
		</li>		
		)

		let addedCurrencies = _.difference(currencies,this.defaultCurrencies)
		let listItems = addedCurrencies.map((currency) =>
    	<li key={currency}>
			<div className="field is-grouped">
			  <p className="control">
			    <a className="button" onClick={()=>{this.changeCurrency({currency})}}>
			      {currency}
			    </a>
			  </p>
			  <p className="control">
			    <button className="delete is-danger" onClick={()=>{this.removeCurrency(currency)}}>
			      DELETE
			    </button>
			  </p>
			</div>
			<p />	
		</li>	
        )

		return (
			<ul>
			{defaultItems}
			{listItems}
			</ul>
		)
	}

	removeCurrency(currency) {
		let apiCall = 'http://localhost:5000/currency/' + currency
		axios.delete(apiCall)
		.then(res=>{
			return this.getCurrencyList()
		}).then(res => this.setState({ 'currencies': res }))
	      .catch(err => console.log(err));
	}

	addCurrency(event) {
		this.getCurrencyList()
	      .then(res => this.setState({ 'currencies': res }))
	      .catch(err => console.log(err));
	}

	changeCurrency(event) {
		this.props.viewCurrency(event.currency);
	}

	getCurrencyList() {
		let apiCall = 'http://localhost:5000/currency'
	 	return axios.get(apiCall).then((res)=>{
	 		let list = res.data
	  		return list
	  	}).catch((err)=>{
	  		console.log(err)
	  	})
	}

	componentDidMount() {
	    this.getCurrencyList()
	      .then(res => this.setState({ 'currencies': res }))
	      .catch(err => console.log(err));
	}


	render() {
		return (
			<aside className="menu">
				<AddCurrency addValidSymbol={this.addCurrency} />
  				<p className="menu-label is-size-5">
  					Currency List
  				</p>
				{this.renderList(this.state.currencies)}
			</aside>
		)
	}

}


export default CurrencyList