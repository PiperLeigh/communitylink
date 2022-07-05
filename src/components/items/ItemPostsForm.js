import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./ItemPostForm.css"

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
            className="dropdown__box"
            onChange={
                (event)=>{
                    const copy= {...itemPost}
                    copy.itemTypeId = event.target.value
                    updateItemPost(copy)
                }
            }>
                <option value="0">Giving, borrowing, or offering on trade?</option>
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
        <main className='itemPostForm__container'>

        <form className='itemPostForm'>

            <fieldset className='dropdown__field'>
                <div className="itemType__dropdown">
                {dropDown()}
                </div>
            </fieldset>

            <fieldset className="itemName__field">
                <div className="itemName__container">
                    <input
                        required autoFocus
                        type="text"
                        className="itemName"
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

            <fieldset className="itemDetail__field">
                <div className="itemDetail__container">
                    <input
                        required autoFocus
                        type="text"
                        className="itemDetail"
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
                <button
                onClick={(clickEvent) => makeNewItemPost(clickEvent)}
                className="itemPostButton">
                Post!
            </button>
            </fieldset>

        </form>
        </main>
    )
}