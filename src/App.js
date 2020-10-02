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
         image:'',
         name: '',
        category:'',
        barcode:'',
        costPrice:'',
        sellingPrice:'',
        expiryDate:'',
        created:'',
        rowKey:null,
      products: []
    } 
    this.editing = this.editing.bind(this);
    this.addProduct= this.addProduct.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleSave= this.handleSave.bind(this);
      }
   
    componentDidMount() {
      axios.get('https://striped-stripe-ulna.glitch.me/api/reorder')
      .then(res => {
        this.setState({ products: res.data })
        console.log(this.state.products)
      })
    }

    editing(id){
      this.state.products.filter(function(p,i) {
        if(i==id) {
          return
      this.setState({ 
          edit: !this.state.edit
          })
          
        }
        else{
          return
         this.setState({ 
          edit: this.state.edit
          })
        }
      })     
  }
   
  
    addProduct(){
      this.setState({
       add: true
      })  
    }

    handleChange(event){
      this.setState({[event.target.name]: event.target.value});  
    }

    handleSubmit(event){
      event.preventDefault();

      const newProducts = {
        image:this.state.image,
        name: this.state.name,
        category: this.state.category,
        barcode: this.state.barcode,
        unit_cost_price: this.state.price,
        unit_selling_price:this.state.sellingPrice,
        expiry_date: this.state.expiryDate,
        created_at: this.state.created
      };
  
      axios.post('https://striped-stripe-ulna.glitch.me/api/reorder',  newProducts )
        .then(res => {
          console.log(res);
          console.log(res.data);
        }) 
    }

    handleSave(event){
      event.preventDefault();

      const newProducts = {
        _id: this.state.id,
        image:this.state.image,
        name: this.state.name,
        category: this.state.category,
        barcode: this.state.barcode,
        unit_cost_price: this.state.costPrice,
        unit_selling_price:this.state.sellingPrice,
        expiry_date: this.state.expiryDate,
        created_at: this.state.created
      };
      axios.post('https://striped-stripe-ulna.glitch.me/api/reorder',  newProducts )
      .then(res => {
        console.log(res);
        console.log(res.data);
    })
  }
     render(){
      const add =
      <tr>
            <td className='adj2'>{this.state.products.length + 1}</td>
            <td className='adj' > <input type="text" name="name" value={this.state.name} onChange={this.handleChange} /></td>
           <td className='adj'><input type="text" name="category" value={this.state.category} onChange={this.handleChange} /></td>
           <td className='adj'><input type="text" name="barcode" value={this.state.barcode} onChange={this.handleChange} /></td>
           <td className='adj'><button onClick={this.handleSubmit} className= 'btn1'>submit</button></td>
           <td className='adj2' ><input type="text" name="price" value={this.state.price} onChange={this.handleChange} /></td>
           <td className='adj' ><input type="text" name="expiryDate"  value={this.state.expiryDate} onChange={this.handleChange} /></td>
           <td className='adj1'><input type="text" name="created" value={this.state.created} onChange={this.handleChange} /></td>
           </tr>
      const noadd= <td></td>
    return(
    <div className='container'>
    <div className= 'topbar'><img id='topimg' src='https://image.freepik.com/free-vector/purple-logo-with-arrows-shape_1043-46.jpg' alt='logo'/></div>
    <div className='container1'>
    <ul>
  <li><a  href="#home">Dashboard</a></li>
  <li><a href="#news">Analytics</a></li>
  <li><a className="active" href="#contact">Products</a></li>
  <li><a href="#about">Logout</a></li>
</ul>
    <div className= 'container2'>
    <div id= 'container3'>
    <span>
      <p id='subhead'>All Products</p>
    <button onClick={this.addProduct} className='btn2'>Add new product</button>
    </span>
    <table className="table table-hover table-bordered" id='heading'>
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
       
    {
    this.state.products.map((product,i)=>{
      //const used
      const editname1 =  <div>{product.name}</div>
      const editname2 =  <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
      const editbar2= <td className='adj1'><input type="text" name="barcode" value={this.state.barcode} onChange={this.handleChange} /></td>
      const editbar1= <td className='adj1'>{product.barcode}</td>
      const editpri1= <td className='adj'><p>cost</p> 
      <p>{product.unit_cost_price}</p>
      <p>selling</p>
      <p>{product.unit_selling_price}</p>
      </td>
      const editpri2= <td className='adj2'><p>cost</p> 
      <input type="text" name="costPrice" value={product.costPrice} onChange={this.handleChange} />
      <p>selling</p>
      <input type="text" name="sellingPrice" value={product.sellingPrice} onChange={this.handleChange} />
      </td>
     const editexp1=  <td className='adj'> {product.expiry_date} </td>
     const editexp2=  <td className='adj'> <input type="text" name="expiryDate" value={product.expiry_date} onChange={this.handleChange} /> </td>
     const editcre2= <td className='adj1' >  <input type="text" name="created" value={product.created_at} onChange={this.handleChange} /> </td>
     const editcre1= <td className='adj1'> {product.created_at} </td>


      return(
       <tbody>
      <tr key={product.id}>
        <td className='adj2'>{i+1}</td>
        <td className='adj'>
        <img className="adjimg" src={product.image} alt="product"/>
          {this.state.edit === true?editname2:editname1}
        </td>
        <td className='adj'>FOOD AND BEVERAGE</td>
        {this.state.edit === true?editbar2:editbar1}
        <td className='adj'><button  onClick={()=>{this.editing(product.id)}} className= 'btn1'>edit</button></td>
        {this.state.edit === true?editpri2:editpri1}
        {this.state.edit === true?editexp2:editexp1}
        {this.state.edit === true?editcre2:editcre1}
      </tr>
      </tbody> 
   
     ) 
    })
 }     
 
      <tbody>
{this.state.add === true?add:noadd}

       </tbody>
</table>
<button onClick={this.handleSave}className='btn3'>Save</button>
   </div>
   </div>
   </div>
   </div>
  
      )   
}
  }

export default App;
