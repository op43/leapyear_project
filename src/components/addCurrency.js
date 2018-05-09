import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import axios from 'axios'



// Text input and button to add currencies to the currency list menu
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
    let currencyName = this.state.value
    let apiCall = 'http://localhost:5000/currency/' + currencyName;
    axios.put(apiCall)
    .then(res => {
      console.log(res)
       let currencyName = this.state.value
       this.props.addValidSymbol(currencyName)
    })
    .catch(err => console.log(err))
  	// getCurrency(this.state.value).then((res)=>{
  	// 	let currencyName = res["name"].toString()
  	// 	this.props.addValidSymbol(currencyName)
   //  	event.persist();
  	// }).catch((err)=>{
  	// 	console.log(err)
   //  	event.persist();
  	// })
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