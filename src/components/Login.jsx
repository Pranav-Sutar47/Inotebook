import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { showToast } from './ToastComponent';
import { Link, useNavigate } from 'react-router-dom';


export default function Login(props) {
    const [credential,setCredential] = useState({email:'',password:''});
    const myHeaders = new Headers();
    const host = 'http://localhost:5000'
    const navigate = useNavigate();
    const change = (e) =>{
        setCredential({...credential,[e.target.name] : e.target.value});
    }

    const handelSubmit = async(e)=>{
        e.preventDefault();
        myHeaders.append("Content-Type", "application/json");
        
        const response = await fetch(`${host}/api/auth/login`,{
          method: "POST",
          headers: myHeaders,
          body : JSON.stringify({email:credential.email,password:credential.password}) 
        })

        const json = await response.json();
        if(json.authtoken){
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            showToast('Login Successfully','info');
        }else{
            showToast('Invalid Credentials','error');
        }
            //console.log("not");
        //console.log(json);
    }


  return (
    <div className={`text-start center bg-${props.toggle}`}>
    <Form className={`text-${props.toggle==='light'?'black':'white'}`} onSubmit={handelSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name='email' value={credential.email} onChange={change}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name='password' value={credential.password} onChange={change}/>
    </Form.Group>

    <Button variant="outline-success" type="submit" className='left'>
      Login
    </Button>
  </Form>
    <br/>
    <Link className='leftc' as={Link} to='/signup'>New to InoteBook Please Sign Up!</Link>
    <br/>
    <br/>
    <p className={`leftcom text-${props.toggle==='ligth'?'dark':'light'}`}> Please Log In to Continue!!!</p>
  </div>
  )
}
