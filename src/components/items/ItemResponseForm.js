import { useState, useMemo } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import "./ItemResponseForm.css"

export const ItemResponseForm = () => {
    const [itemResponse, updateItemResponse] = useState({
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

    const makeNewItemResponse = (event) => {
        event.preventDefault()

        const itemResponseToSendToAPI = {
            itemPostId: query.get("itemPostId"),
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
                const previousPage = query.get('previousPage')
                navigate(previousPage)
            })
    }
    return (
        <main className='itemResponseForm__container'>
        <form className='itemResponseForm'>
            <fieldset>
                <div>
                    <textarea
                        required autoFocus
                        type="text"
                        className="itemResponseBody"
                        placeholder="Hey neighbor! Thanks for sharing!"
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
                className="itemResponseButton">
                SEND!
            </button>
        </form>
        </main>
    )
}