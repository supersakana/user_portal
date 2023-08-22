import React, { useState } from 'react'
import axios from "axios"

function PostForm({ currentUser }) {
    const [values, setValues] = useState({
        title: "",
        body: ""
    })
    const handleSubmit = async (e) => {
            e.preventDefault()

            try{
                const { data } = await axios.post(
                    "http://localhost:4000/post",
                    { ...values, user: currentUser },
                    { withCredentials: true })
                    
                    if(data){
                      console.log(data)
                    }
            } catch(error) {
                console.log(error.message)
            }
        };
      
    return (
        <div className="container">
            <h4>Make a post</h4>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label htmlFor="body">Body</label>
                    <input
                        type="textarea"
                        name="body"
                        placeholder="Body"
                        onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
  )
}

export default PostForm
