import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

export default function Secret() {
  const navigate = useNavigate()
  const [cookies, removeCookie] = useCookies([])

  useEffect(() => {
    const verifyUser = async () => {
      if(!cookies.jwt){
        navigate("/login")
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/",
          {},
          { withCredentials: true }
        )
        if (!data.status){
          removeCookie("jwt")
          navigate("/login")
        } else {
          toast(`Hi ${data.user}`, { theme: "dark" })
        }
      }
    }
    verifyUser();
  }, [cookies, navigate, removeCookie]) //dependency array

  const logOut = () => {
    navigate("/login")
  }

  return(
    <>
      <div>
        <h1>Secret Page</h1>
        <button onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </>
  )
}