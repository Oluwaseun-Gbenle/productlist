import React from 'react';
import axios from 'axios';
import './App.css';
import { Component } from "react";  

class App extends Component {
    constructor(props) {
        super(props);
       this.state = {
         edit:false,
         add:false,
         name: '',
        category:'',
        barcode:'',
        price:'',
        expiryDate:'',
        created:'',
      products: []
    } 
    this.editing = this.editing.bind(this);
    this.addProduct= this.addProduct.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
      }
   
    componentDidMount() {
      axios.get('https://striped-stripe-ulna.glitch.me/api/reorder')
      .then(res => {
        this.setState({ products: res.data })
        console.log(this.state.products)
      })
    }

    editing(){
   this.setState({
     edit: !this.state.edit
   })
    }
  
    addProduct(){
      this.setState({
       add: true
      })  
    }

    handleSubmit(event){
      event.preventDefault();

      const newProducts = {
        name: this.state.name,
        category: this.state.category,
        barcode: this.state.barcode,
        price: this.state.price,
        expiryDate: this.state.expiryDate,
        created: this.state.created
      };
  
      axios.post('https://striped-stripe-ulna.glitch.me/api/reorder', { newProducts })
        .then(res => {
          console.log(res);
          console.log(res.data);
        }) 
    }

    
  handleChange(event){
    this.setState({ name: event.target.value,
      category: event.target.value,
      barcode: event.target.value,
      price: event.target.value,
      expiryDate: event.target.value,
      created:event.target.value
    });
  }

     render(){
      const add =
      <tr>
            <td className='adj2'>{this.state.products.length + 1}</td>
           <td className='adj' > <input type="text" name="name" onChange={this.handleChange} /></td>
           <td className='adj'><input type="text" name="category" onChange={this.handleChange} /></td>
           <td className='adj'><input type="text" name="barcode" onChange={this.handleChange} /></td>
           <td className='adj'><button onClick={this.handleSubmit} className= 'btn1'>submit</button></td>
           <td className='adj2' ><input type="text" name="price" onChange={this.handleChange} /></td>
           <td className='adj' ><input type="text" name="expiryDate" onChange={this.handleChange} /></td>
           <td className='adj1'><input type="text" name="created" onChange={this.handleChange} /></td>
           </tr>
      const noadd= <br></br>
    return(
    <div className='container'>
    <div className= 'topbar'></div>
    <div className='container1'>
    <div className= 'container2'>
    <div id= 'container3'>
    <span>
      <p id='subhead'>All Products</p>
    <button onClick={this.addProduct} className='btn2'>Add new product</button>
    </span>
    <table class="table" id='heading'>
    <thead>
         <tr>
         <th>#</th>
           <th>Name</th>
           <th>Category</th>
           <th>Barcode</th>
           <th>Actions</th>
           <th>Price</th>
           <th>Expiry date</th>
           <th>Created</th>
         </tr>
       </thead>
       </table>
    {
    this.state.products.map((product,i)=>{
      const editname1 =  <div>{product.name}</div>
      const editname2 =  <div contentEditable>{product.name}</div>
      const editcat1=   <td className='adj'>FOOD AND BEVERAGE</td>
      const editcat2=   <td className='adj'contentEditable>FOOD AND BEVERAGE</td>
      const editbar2= <td contentEditable className='adj1'>{product.barcode}</td>
      const editbar1= <td className='adj1'>{product.barcode}</td>
      const editpri1= <td className='adj'><p>cost</p> 
      <p>{product.unit_cost_price}</p>
      <p>selling</p>
      <p>{product.unit_selling_price}</p>
      </td>
      const editpri2= <td className='adj2' contentEditable><p>cost</p> 
      <p>{product.unit_cost_price}</p>
      <p>selling</p>
      <p>{product.unit_selling_price}</p>
      </td>
     const editexp1=  <td className='adj'> {product.expiry_date} </td>
     const editexp2=  <td className='adj' contentEditable> {product.expiry_date} </td>
     const editcre2= <td className='adj1' contentEditable> {product.created_at} </td>
     const editcre1= <td className='adj1'> {product.created_at} </td>
      return(
    <table class="table">
       <tbody>
      <tr key={i}>
        <td className='adj2'>{i+1}</td>
        <td className='adj'>
        <img className="adjimg" src={product.image} alt="product"/>
          {this.state.edit === true?editname2:editname1}
        </td>
        {this.state.edit === true?editcat2:editcat1}
        {this.state.edit === true?editbar2:editbar1}
        <td className='adj'><button onClick={this.editing} className= 'btn1'>edit</button></td>
        {this.state.edit === true?editpri2:editpri1}
        {this.state.edit === true?editexp2:editexp1}
        {this.state.edit === true?editcre2:editcre1}
      </tr>
      </tbody> 
   </table>
     ) 
    })
 }     
 <table class="table">
      <tbody>
{this.state.add === true?add:noadd}

       </tbody>
</table>

   </div>
   </div>
   </div>
   </div>
  
      )   
}
  }

export default App;
