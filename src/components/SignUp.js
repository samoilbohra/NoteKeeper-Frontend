import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
    const navigate = useNavigate();
    const [signup , setsignup] = useState({name: "",email : "" , password : "" , confirmPassword : ""});
   const handleChange = (e)=>
   {
    setsignup({...signup , [e.target.id] : e.target.value});
   }
   const  handleSubmit = async(e)=>
{
e.preventDefault();
if(signup.password === signup.confirmPassword)
{

    
    //  API CALL
    const response = await fetch(`https://notekeeperbackend.onrender.com/api/auth/createuser`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ name : signup.name , email: signup.email , password: signup.password })
    });
    const json = await response.json(); 
    console.log(json);
    if(json.success)
    {
 localStorage.setItem('token' , json.authToken);
 navigate('/');
props.showAlert("success" , "SignUp Successfull"); 

    }
    else{
        props.showAlert("danger" , "User Already registered"); 
    }
}
else{
    props.showAlert("danger" , "Confirm with same password "); 
}
    
}


return (
    <div className='container' style={{width : "60%"}} >
    <h1  className='my-3' >Create  Acoount To Access our Notes </h1>
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" onChange={handleChange} id="name"  value={signup.name} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" onChange={handleChange} id="email" aria-describedby="emailHelp" value={signup.email} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" onChange={handleChange} id="password" value={signup.password}  />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" onChange={handleChange} id="confirmPassword" value={signup.confirmPassword}  />
      </div>
      <div className='' style={{textAlign: "center "}} >
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </form>
        </div>
    
  )
}
