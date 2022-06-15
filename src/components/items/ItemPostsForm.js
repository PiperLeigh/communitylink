import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export const ItemPostForm = () => {

    const [itemPost, updateItemPost] = useState({
        itemName: "",
        itemDescription: ""
    })

    const navigate = useNavigate()

    const localCommunityLinkUser = localStorage.getItem("communitylink_user")
    const communityLinkUserObject = JSON.parse(localCommunityLinkUser)

    const makeNewItemPost = (event) => {
        event.preventDefault()

        const itemPostToSendToAPI = {
            userId: communityLinkUserObject.id,
            itemName: itemPost.itemName,
            itemDescription: itemPost.itemDescription
        }

        return fetch('http://localhost:8088/itemPosts?_expand=user&_expand=itemType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemPostToSendToAPI),
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
                        placeholder="Whatcha got?"
                        value={itemPost.itemName}
                        onChange={
                            (evt) => {
                                const copy = { ...itemPost } //create copy of existing state
                                copy.itemName = evt.target.value //set the description property's value on the target to whatever is currently in input field/the value of the event target
                                updateItemPost(copy) //update state  variable to the copy ^^
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
                        placeholder="Say more!"
                        value={itemPost.itemDescription}
                        onChange={
                            (evt) => {
                                const copy = { ...itemPost } //create copy of existing state
                                copy.itemDescription = evt.target.value //set the description property's value on the target to whatever is currently in input field/the value of the event target
                                updateItemPost(copy) //update state  variable to the copy ^^
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => makeNewItemPost(clickEvent)}
                className="btn btn-primary">
                Post!
            </button>
        </form>
    )
}