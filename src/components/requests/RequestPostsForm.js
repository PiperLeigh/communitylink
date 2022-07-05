import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./RequestPostsForm.css"

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
        <main className='requestPostForm__pageContainer'>
        <form className="requestPost__form">

            <fieldset className="requestPost__headlineField">
                <input
                    required autoFocus
                    type="text"
                    className="requestHeadline"
                    placeholder="What do you need help with?"
                    value={requestPost.requestTopic}
                    onChange={
                        (evt) => {
                            const copy = { ...requestPost } //create copy of existing state
                            copy.requestTopic = evt.target.value //set the description property's value on the target to whatever is currently in input field/the value of the event target
                            updateRequestPost(copy) //update state  variable to the copy ^^
                        }
                    } />
            </fieldset>

            <fieldset className="requestDetails__container">
                <input
                    required autoFocus
                    type="text"
                    className="requestDetails"
                    placeholder="Say more about how your neighbors can help?"
                    value={requestPost.requestDescription}
                    onChange={
                        (evt) => {
                            const copy = { ...requestPost } //create copy of existing state
                            copy.requestDescription = evt.target.value //set the description property's value on the target to whatever is currently in input field/the value of the event target
                            updateRequestPost(copy) //update state  variable to the copy ^^
                        }
                    } />
            </fieldset>

            <fieldset className="requestUrgentPost">
                <span className='requestUrgent__container'>
                    <input type="radio"
                    className='requestUrgentRadio'
                        value={requestPost.urgent}
                        onChange={
                            (evt) => {
                                const copy = { ...requestPost }
                                copy.urgent = evt.target.checked //.checked because it's a checkbox
                                updateRequestPost(copy) //update state  variable to the copy ^^
                            }
                        } /> <label className="requestUrgentLabel" htmlFor="name">Urgent?</label>
                </span>
                <span className="requestPostButton__container">
                    <button
                        onClick={(clickEvent) => makeNewRequestPost(clickEvent)}
                        className="requestPostButton">
                        Post!
                    </button>
                </span>

            </fieldset>

        </form>
        </main>
    )
}