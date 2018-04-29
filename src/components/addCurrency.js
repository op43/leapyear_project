import React, { Component } from 'react'
import 'bulma/css/bulma.css'

import getCurrency from '../api'


class AddCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({value: event.target.value});
  }

  handleButtonSubmit(event) {
  	getCurrency(this.state.value).then((res)=>{
  		let currencyName = res["name"].toString()
  		this.props.addValidSymbol(currencyName)
    	event.persist();
  	}).catch((err)=>{
  		alert('Currency not listed');
    	event.persist();
  	})
  }

  render() {
    return (
      	<div className="field has-addons">
		  <div className="control">
		    <input className="input" type="text" placeholder="CURRENCY SYMBOL" onChange={this.handleInputChange} />
		  </div>
		  <div className="control">
		    <a className="button is-info" onClick={this.handleButtonSubmit}>
		      ADD
		    </a>
		  </div>
		</div>
    );
  }
}



export default AddCurrency