import React, { useState } from 'react'
import {useNavigate}  from 'react-router-dom'

export default function Login(props) {
    const navigate = useNavigate();
    const [login , setLogin] = useState({email : "" , password : ""});
   const handleChange = (e)=>
   {
    setLogin({...login , [e.target.id] : e.target.value});
   }
   const  handleSubmit = async(e)=>
{
e.preventDefault();

  //  API CALL
  const response = await fetch(`https://notekeeperbackend.onrender.com/api/auth/login`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
   
    body: JSON.stringify({ email: login.email , password: login.password})
  });
const json = await response.json(); 
console.log(json);

if(json.success)
{
  localStorage.setItem('token' ,json.authToken)
  navigate('/');
props.showAlert("success" , "Logged in Successfully"); 

}
else{
props.showAlert("danger" , "enter valid credentials"); 
}

}

  return (
    <div className='container' style={{width : "60%"}} >
    <h1 className='mx-2 my-3' > Please Login To Access Your Notes </h1>
<form>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={handleChange} id="email" aria-describedby="emailHelp" value={login.email} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={handleChange} id="password" value={login.password}  />
  </div>
  <div className='' style={{textAlign: "center "}} >

  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
  </div>
</form>
    </div>
  )
}
