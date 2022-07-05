import { useState, useMemo } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import "./RequestResponseForm.css"

export const RequestResponseForm = () => {
    const [requestResponse, updateRequestResponse] = useState({
        responseBody: ''
    })

    const navigate = useNavigate()

    const localCommunityLinkUser = localStorage.getItem("communitylink_user")
    const communityLinkUserObject = JSON.parse(localCommunityLinkUser)
    let query = useQuery();
    
    function useQuery() {
        const { search } = useLocation();
      
        return useMemo(() => new URLSearchParams(search), [search]);
      }

    const makeNewRequestResponse = (event) => {
        event.preventDefault()
        

        const requestResponseToSendToAPI = {
            requestPostId: query.get("requestPostId"),
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
        <main className='requestResponse__page'>

        <form className='requestResponse__form'>

            <fieldset className="responseBody__field">
                <div className="responseBody__container">
                    <input
                        required autoFocus
                        type="text"
                        className="responseBody"
                        placeholder="Hey neighbor!"
                        value={requestResponse.responseBody}
                        onChange={
                            (evt) => {
                                const copy = { ...requestResponse } //create copy of existing state
                                // copy.requestPostId =
                                copy.responseBody = evt.target.value //set the description property's value on the target to whatever is currently in input field/the value of the event target
                                updateRequestResponse(copy) //update state  variable to the copy ^^
                            }
                        } />
                </div>

            </fieldset>

            <button
                onClick={(clickEvent) => makeNewRequestResponse(clickEvent)}
                className="responseButton">
                SEND!
            </button>
        </form>
        </main>
    )
}