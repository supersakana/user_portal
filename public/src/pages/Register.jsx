import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"

export default function Register() {
    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: "",
        password: "",
        username: "",
    })

    const generateError = (error) => toast.error(error, {
      position: "bottom-right"
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(values.username === values.email){
          generateError("Username and email can not be the same")
          return
        }

        try{
            const { data } = await axios.post(
                "http://localhost:4000/register",
                { ...values },
                { withCredentials: true })

                if(data){
                  if(data.errors){
              
                    const { username, email, password } = data.errors

                    if(email) generateError(email)
                    else if (password) generateError(password)
                    else if (username) generateError(username)
                  
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
      <h2>Register Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
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
          Already have an account? <Link to="/login">Login</Link>
        </span>

      </form>
      <ToastContainer />
    </div>
  )
}