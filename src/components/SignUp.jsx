import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { showToast } from './ToastComponent';
import { useNavigate,Link } from 'react-router-dom';

export default function SignUp(props) {
  const [credential,setCredential] = useState({name:"",email:"",password:"",cpassword:""});
  const myHeaders = new Headers();
  const host = 'http://localhost:5000'
  const navigate = useNavigate();

  const change = (e) =>{
    setCredential({...credential,[e.target.name]:e.target.value});
    //console.log(credential);
  }

  const clearForm = () =>{
    setCredential({email:"",name:"",password:"",cpassword:""});
  }

  const validate = () =>{
    if(credential.password.length>=4){
      if(credential.password === credential.cpassword){
          if(credential.name.length>3)
            return true;
      }
    }
    return false;

  }

  const handelSubmit = async(e) =>{
    let res = validate();
    e.preventDefault();
    myHeaders.append("Content-Type", "application/json");
    if(!res){
      showToast('Please fill valid details','error');
    }else{
      const response = await fetch(`${host}/api/auth/createuser`,{
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
      })
      const json = await response.json();
      localStorage.setItem('token',json.jwtData);
      navigate('/');
      showToast('Your account created Successfully!','info');
      //console.log(json);
      clearForm();
    }

  }

  return (
    <div className={`text-start center bg-${props.toggle}`}>
      <Form className={`text-${props.toggle === 'light' ? 'black' : 'white'}`} onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name='name' value={credential.name} onChange={change} required minLength={3} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' value={credential.email} onChange={change} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' value={credential.password} onChange={change} required  minLength={4}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="cformBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='cpassword' value={credential.cpassword} onChange={change} required minLength={4} />
        </Form.Group>

        <Button variant="outline-success" type="submit" className='left'>
          Sign Up
        </Button>
        <br/>
        <br/>
        <Link className='leftcom' as={Link} to='/login'>Already Account,Please Sign In</Link>

      </Form>
    </div>
  )
}
