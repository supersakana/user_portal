import React, { useState } from 'react'

function PostForm() {
    const [values, setValues] = useState({
        title: "",
        body: ""
    })
    const handleSubmit = async (e) => {
            e.preventDefault()
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
