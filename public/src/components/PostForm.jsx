import React, { useState } from 'react'
// import axios from "axios"

function PostForm({ handlePostSubmit }) {
    const [values, setValues] = useState({
        title: "",
        body: ""
    })
    
    return (
        <div className="container">
            <h4>Make a post</h4>
            <form onSubmit={(e) => handlePostSubmit(e, values)}>
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
