import React, { useState } from "react";
import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import axios from "axios"

export default function Register() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const { data } = await axios.post(
                "http://localhost:4000/register",
                { ...values },
                { withCredentials: true })
                
                if(data){
                  if(data.errors){
                    // handle errors
                  } else {
                    // redirect to home
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