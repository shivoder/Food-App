import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'


export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
       navigate("/");
    }


  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return (
    <div>
      <div className='container' >
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>

          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          </div>

          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/creatuser" className="m-3 mx-1 btn btn-danger">I'm a new user</Link>
        </form>
      </div>
    </div>
  )
}
