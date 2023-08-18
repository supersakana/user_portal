import React from "react";
import { useNavigate } from "react-router-dom"

export default function Secret() {
  const navigate = useNavigate()

  const logOut = () => {
    navigate("/login")
  }

  return(
    <div>
      <h1>Secret Page</h1>
      <button onClick={logOut}>Log out</button>
    </div>
  )
}