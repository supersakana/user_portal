import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"

export default function Login() {
  const navigate = useNavigate()

  const [values, setValues] = useState({
      email: "",
      password: ""
  })

  const generateError = (error) => toast.error(error, {
    position: "bottom-right"
  })

  const handleSubmit = async (e) => {
      e.preventDefault()

      try{
          const { data } = await axios.post(
              "http://localhost:4000/login",
              { ...values },
              { withCredentials: true })
              
              if(data){
                if(data.errors){
                  
                  const { email, password } = data.errors
                  if(email) generateError(email)
                  else if (password) generateError(password)
                
                } else {
                  navigate("/")
                }

              }
      } catch(error) {
          console.log(error.message)
      }
    };

  return(
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email or Username"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>

        <button type="submit">Submit</button>

        <span>
        Don't have an account? <Link to="/register">Register</Link>
        </span>

      </form>
      <ToastContainer />
    </div>
  )
}