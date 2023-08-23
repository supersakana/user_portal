import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

// Components
import PostForm from "../components/PostForm";

export default function Secret() {
  const navigate = useNavigate()
  const [cookies, removeCookie] = useCookies([])

  const [currentUser, setCurrentUser] = useState({})

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

  const handlePostSubmit = async (e, values) => {
    e.preventDefault()

    try{
        const { data } = await axios.post(
            "http://localhost:4000/post",
            { ...values, user: currentUser },
            { withCredentials: true })
            
            if(data){
              setCurrentUser(data.author)
            }
    } catch(error) {
        console.log(error.message)
    }
};

  return(
    <>
      <div>
        <h1>Secret Page</h1>
        <h3>Welcome { currentUser.username }</h3>
        <button onClick={logOut}>Log out</button>
        <PostForm handlePostSubmit={handlePostSubmit} />
      </div>

      <span>{ currentUser.posts }</span>
      {/* ^^^ How can we get the posts length to display? */}
      <ToastContainer />
    </>
  )
}