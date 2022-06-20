import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export const ItemPostForm = () => {

    const [itemPost, updateItemPost] = useState({
        itemTypeId: 0,
        itemName: "",
        itemDescription: ""
    })

    const navigate = useNavigate()
    const localCommunityLinkUser = localStorage.getItem("communitylink_user")
    const communityLinkUserObject = JSON.parse(localCommunityLinkUser)
    const [itemTypes, setItemTypes] = useState([])

    const dropDown = () => {
        fetch('http://localhost:8088/itemTypes')
            .then(response => response.json())
            .then((itemTypesArray) => {
                setItemTypes(itemTypesArray)
            })
            return <>
            <label for="dropdown__itemType"></label>
            <select 
            value={itemPost.itemTypeId}
            onChange={
                (event)=>{
                    const copy= {...itemPost}
                    copy.itemTypeId = event.target.value
                    updateItemPost(copy)
                }
            }>
                <option value="0">Are you giving, borrowing, or offering on trade?</option>
                {itemTypes.map((itemType) => {
                    return <option
                        key={itemType.id} value={itemType.id}>
                            {itemType.typeName}
                    </option>
                })}
            </select>
            </>
    }

    const makeNewItemPost = (event) => {
        event.preventDefault()

        const itemPostToSendToAPI = {
            userId: communityLinkUserObject.id,
            itemTypeId: itemPost.itemTypeId,
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
                <div className="itemType-dropdown">
                {dropDown()}
                </div>
            </fieldset>
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