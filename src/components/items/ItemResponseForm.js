import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export const ItemResponseForm = () => {
    const [itemResponse, updateItemResponse] = useState({
        responseBody: ''
    })

    const navigate = useNavigate()

    const localCommunityLinkUser = localStorage.getItem("communitylink_user")
    const communityLinkUserObject = JSON.parse(localCommunityLinkUser)

    const makeNewItemResponse = (event) => {
        event.preventDefault()

        const itemResponseToSendToAPI = {
            itemPostId: itemResponse.itemPostId,
            userId: communityLinkUserObject.id, 
            responseBody: itemResponse.responseBody
        }

        return fetch('http://localhost:8088/itemResponses?_expand=itemPost&_expand=user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemResponseToSendToAPI),
        })
            .then((response) => response.json())
            .then(() => {
                navigate('/free-store')
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
                        placeholder="Hey neighbor! I'm interested in that item ya got there'!"
                        value={itemResponse.responseBody}
                        onChange={
                            (evt) => {
                                const copy = { ...itemResponse } //create copy of existing state
                                copy.responseBody = evt.target.value //set the description property's value on the target to whatever is currently in input field/the value of the event target
                                updateItemResponse(copy) //update state  variable to the copy ^^
                            }
                        } />
                </div>
            </fieldset>
            
            <button
                onClick={(clickEvent) => makeNewItemResponse(clickEvent)}
                className="btn btn-primary">
                SEND!
            </button>
        </form>
    )
}