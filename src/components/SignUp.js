import React from 'react'
import { useEffect } from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
const SignUp = () => {
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
      const auth=localStorage.getItem('user');
      if(auth) {
        navigate('/');
      }
    })
    const collectData=async ()=>{
        console.warn(name,email,password);
        let result= await fetch('http://localhost:5000/register',{
          method:'post',
          body: JSON.stringify({name,email,password}),
          headers:{
            'Content-Type':"application/json"
          }
        });
        result=await result.json();

        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
          navigate('/')
        
    }
  return (
    <div className='box'>
      <h1>Register</h1>
      <input className="input-box" type="text" 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      placeholder='Enter Name' />
      <input className="input-box" type="text" 
      value={email} onChange={(e)=>setEmail(e.target.value)}
      placeholder='Enter Email' />
      <input className="input-box" type="password"  
      value={password} onChange={(e)=>setPassword(e.target.value)}

      placeholder='Enter Password'/>
      <button className='button-b' onClick={collectData} type="Button" >Sign Up</button>
    </div>
  );
};

export default SignUp;
