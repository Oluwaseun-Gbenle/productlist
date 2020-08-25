import React from 'react';
import axios from 'axios';
import './App.css';
import { Component } from "react";  

class App extends Component {
    constructor(props) {
        super(props);
       this.state = {
      products: {}
    } 
     
      }
   
    componentDidMount() {
      axios.get('https://striped-stripe-ulna.glitch.me/api/reorder')
      .then(res => {
        this.setState({ products: res.data })
        console.log(this.state.products)
      })
    }

     render(){
    return(
    <div className='container'>
    <div className="row">
    {
    this.state.products.map((product)=>( 
    <div>
    <div className='col-xs-12'>
     <p>{product.inventory.name}</p>  
   </div>
   <div class="col-xs-12">
       <p>FOOD AND BEVERAGE</p>
   </div>   
   <div class="col-xs-12">
   <p>{product.inventory.barcode}</p>
   </div> 
   <div class="col-xs-12">
      <button>edit</button>   
   </div> 
   <div class="col-xs-12">
      <p>cost</p> 
      <p>{product.inventory.unit_cost_price}</p>
      <p>selling</p>
      <p>{product.inventory.unit_selling_price}</p>  
   </div> 
   <div class="col-xs-12">
     {product.inventory.expiry_date}     
   </div> 
   <div class="col-xs-12">
      <p>{product.inventory.created_at}</p>    
   </div> 
   </div>
 ))
 }                                                                                                                                                                                                                                                                                                                                                                                            
   </div>
   </div>
      )   
}
  }

export default App;
