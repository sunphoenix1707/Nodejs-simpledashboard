import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [email,setEmail]=React.useState('');
    const[password,setPassword]=React.useState('');
    //we successfully resolved issue-whenever we logged in we would be shown only option of
    //logout not login but through url by /login we can again access login page for that we use
    // auth and useEffect
    useEffect(()=>{
      const auth = localStorage.getItem('user');
      if(auth) {
         navigate("/")
      }
    },[])
    const navigate=useNavigate();
    const handleLogin= async ()=> {
        console.warn("email,password",email,password);
        let result=await fetch('http://localhost:5000/login',
        {
                 method: 'post',
                 body: JSON.stringify({email,password}),
                 headers: {
                    'Content-Type': "application/json"
                  }
        });
        result = await result.json();
        console.warn(result);
        if(result.auth) {
           localStorage.setItem("user",JSON.stringify(result.user));
           localStorage.setItem("token",JSON.stringify(result.auth));
           navigate("/");
        }
        else {
            alert("please enter correct details")
        }
    }
  return (
    <div className='login'>
        <h1>Login</h1>
      <input type="text" className='input-box' placeholder='Enter Email'
      onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <input type="password" className='input-box' placeholder='Enter Password'
      onChange={(e)=>setPassword(e.target.value)} value={password}/>
      <button className='button-b' onClick={handleLogin} type="Button" >Login</button>
    </div>
  )
}

export default Login
