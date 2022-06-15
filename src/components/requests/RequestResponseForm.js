import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export const RequestResponseForm = () => {
    const [requestResponse, updateRequestResponse] = useState({
        responseBody: ''
    })

    const navigate = useNavigate()

    const localCommunityLinkUser = localStorage.getItem("communitylink_user")
    const communityLinkUserObject = JSON.parse(localCommunityLinkUser)

    const makeNewRequestResponse = (event) => {
        event.preventDefault()

        const requestResponseToSendToAPI = {
            requestPostId: requestResponse.requestPostId,
            userId: communityLinkUserObject.id,
            responseBody: requestResponse.responseBody
        }

        return fetch('http://localhost:8088/requestResponses?_expand=requestPost&_expand=user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestResponseToSendToAPI),
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
                        placeholder="Hey neighbor! I can help out!"
                        value={requestResponse.responseBody}
                        onChange={
                            (evt) => {
                                const copy = { ...requestResponse } //create copy of existing state
                                copy.responseBody = evt.target.value //set the description property's value on the target to whatever is currently in input field/the value of the event target
                                updateRequestResponse(copy) //update state  variable to the copy ^^
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => makeNewRequestResponse(clickEvent)}
                className="btn btn-primary">
                SEND!
            </button>
        </form>
    )
}