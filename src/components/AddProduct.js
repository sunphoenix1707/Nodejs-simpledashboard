import React from 'react'
import {useNavigate} from 'react-router-dom';
const AddProduct = () => {
  const navigate=useNavigate();
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [error,setError]=React.useState(false);
    const addProduct= async ()=> {
         //i will use ! in case of no data return true else false
         console.warn(!name);
         if(!name || !price || !category || !company) {
            setError(true);
            return false;
         }
        console.warn(name,price,category,company);
       
        //in local storage data is in form of strings firstly we need it to convert it into objects
        const userId=JSON.parse(localStorage.getItem('user'))._id;
       let result= await fetch("http://localhost:5000/add-product" , 
       {
          method : 'post' ,
          body: JSON.stringify({name,price,category,company,userId}),
        headers : {

                'Content-Type' : "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
    });
    //data form of readstream .json() use
    result=await result.json();
    console.log(result);
    navigate("/")
    }
  return (
    <div className='product'>
      <h1>Add Product</h1>
      <input type="text" placeholder='Enter Product Name' className='input-box'
      value={name}
      onChange={(e)=>{setName(e.target.value)}}
      />
      {error && !name &&  <span className='invalid-input'>Enter Valid name</span> }
       <input type="text" placeholder='Enter Product Price' className='input-box'
       value={price}
       onChange={(e)=>{setPrice(e.target.value)}}
      />
      {error && !price &&  <span className='invalid-input'>Enter Valid price</span> }
       <input type="text" placeholder='Enter Product Category' className='input-box'
       value={category}
       onChange={(e)=>{setCategory(e.target.value)}}
      />
      {error && !category &&  <span className='invalid-input'>Enter Valid category</span> }
       <input type="text" placeholder='Enter Product Company' className='input-box'
       value={company}
       onChange={(e)=>{setCompany(e.target.value)}}
      />
      {error && !company &&  <span className='invalid-input'>Enter Valid company</span> }
      <button className='button-b' onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default AddProduct
