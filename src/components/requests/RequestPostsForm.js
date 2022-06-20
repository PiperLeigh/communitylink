import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export const RequestPostForm = () => {
    const [requestPost, updateRequestPost] = useState({
        requestTopic: '',
        requestDescription: '',
        urgent: false
    })

    const navigate = useNavigate()

    const localCommunityLinkUser = localStorage.getItem("communitylink_user")
    const communityLinkUserObject = JSON.parse(localCommunityLinkUser)

    const makeNewRequestPost = (event) => {
        event.preventDefault()

        const requestPostToSendToAPI = {
            id: 0,
            userId: communityLinkUserObject.id, 
            requestTopic: requestPost.requestTopic,
            requestDescription: requestPost.requestDescription,
            urgent: requestPost.urgent
        }

        return fetch('http://localhost:8088/requestPosts?_expand=user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPostToSendToAPI),
        })
            .then((response) => response.json())
            .then(() => {
                navigate('/be-a-neighbor')
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
                    <label htmlFor="name">Urgent?</label>
                    <input type="checkbox"
                        value={requestPost.urgent}
                        onChange={
                            (evt) => {
                                const copy = { ...requestPost }
                                copy.urgent = evt.target.checked //.checked because it's a checkbox
                                updateRequestPost(copy) //update state  variable to the copy ^^
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