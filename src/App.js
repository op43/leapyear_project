import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import './App.css'

import CurrencyList from './components/currencyList.js' 
import CurrencyBox from './components/currencyBox.js' 


// Main app to be rendered by index.js
class App extends Component {
	constructor(props) {
		super(props)
		this.updateBox = this.updateBox.bind(this)
		this.state = {'onScreen':'BTC'}
	}

	updateBox(currency) {
		this.setState({'onScreen':currency})
	}

	render() {
		let currencyName = this.state.onScreen

		return (
			<div>
				<section className="hero is-primary is-bold">
					<div className="hero-body is-size-2 has-text-centered">LeapYear Fullstack Challenge</div>
				</section>
				<section className="section">
					<div className="columns is-mobile">
						<div className="column is-half-mobile is-narrow">
							<div className="box">
								<CurrencyList change={currencyName} viewCurrency={this.updateBox}/>
							</div>
						</div>
						<div className="column">
							<CurrencyBox currencyName={this.state.onScreen} />
						</div>
					</div>
				</section>

				
			</div>
		)
	}
}

export default App
