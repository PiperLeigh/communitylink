import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export const ItemPostForm = () => {
    cont [requestPost, updateRequestPost] = useState({
        //userId: ,
        requestTopic: '',
        requestDescription: '',
        urgent: false
    })

    const navigate = useNavigate()

    const makeNewRequestPost = (event) => {
        event.preventDefault()

        return fetch('http:localhost:8088/requestPosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPost),
        })
            .then((response) => response.json())
            .then(() => {
                navigate('/requestPosts')
            })
    }
    return (
        <form>
            <fieldset>
                <div className="form-group">
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief headline of request"
                        value={requestPost.requestTopic}
                        onChange={
                            (evt) => {
                                const copy = { ...requestPost } //create copy of existing state
                                copy.requestTopic = evt.target.value //set the description property's value on the target to whatever is currently in input field/the value of the event target
                                updateRequestPost(copy) //update state  variable to the copy ^^
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Please give us more details about how we can help"
                        value={requestPost.requestDescription}
                        onChange={
                            (evt) => {
                                const copy = { ...requestPost } //create copy of existing state
                                copy.requestDescription = evt.target.value //set the description property's value on the target to whatever is currently in input field/the value of the event target
                                updateRequestPost(copy) //update state  variable to the copy ^^
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter Product Type Here"
                        value={requestPost.requestDescription}
                        onChange={
                            (evt) => {
                                const copy = { ...requestPost } //create copy of existing state
                                copy.type = evt.target.value //set the description property's value on the target to whatever is currently in input field/the value of the event target
                                updateProduct(copy) //update state  variable to the copy ^^
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => makeNewRequestPost(clickEvent)}
                className="btn btn-primary">
                Post!
            </button>
        </form>
    )
}