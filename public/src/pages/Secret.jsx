import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

export default function Secret() {
  const navigate = useNavigate()
  const [cookies, removeCookie] = useCookies([])

  const [currentUser, setCurrentUser] = useState({})

  // https://dmitripavlutin.com/react-useeffect-explanation/
  // ^^^ look into useEffect with this article

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
          setCurrentUser({})
          removeCookie("jwt")
          navigate("/login")
        } else {
          setCurrentUser(data.user)
          toast(`Hi ${data.user.username}`, { theme: "dark" })
        }
      }
    }
    verifyUser();
  }, [navigate, cookies, removeCookie]) //dependency array

  const logOut = () => {
    setCurrentUser({})
    removeCookie("jwt")
    navigate("/login")
  }

  return(
    <>
      <div>
        <h1>Secret Page</h1>
        <h3>Welcome { currentUser.username }</h3>
        <button onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </>
  )
}