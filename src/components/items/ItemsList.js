import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ItemList.css"

export const ItemsList = () => {
    const [items, setItems] = useState([])

    const navigate = useNavigate()

    const fetchPosts = () => {
        fetch('http://localhost:8088/itemPosts?_expand=itemType&_expand=user')
            .then(response => response.json())
            .then((itemsArray) => {
                setItems(itemsArray.filter(itemPost => itemPost.user.zip === CommunityLinkUserObject.zip))
            })
    }
    // setRequests(requestArray.filter(request => request.user.zip === CommunityLinkUserObject.zip))

    useEffect(fetchPosts, [])

    const localCommunityLinkUser = localStorage.getItem("communitylink_user")
    const CommunityLinkUserObject = JSON.parse(localCommunityLinkUser)

    const deleteButtonDisplay = (item) => {
        if (item.userId === CommunityLinkUserObject.id) {
            return <button onClick={() => deleteButtonFunction(item)} className="item__delete">x</button>
        }
    }

    const deleteButtonFunction = (item) => {
        return fetch(`http://localhost:8088/itemPosts/${item.id}`, {
            method: "DELETE"
        }).then(fetchPosts)
    }


    return <>
        <article className="items">
            <button className="give__button" onClick={() => navigate("/itemPost/create")}>GIVE</button>
            {
                items.map(
                    (item) => {
                        return <>
                            <section className='item' key={item.id}>
                                <div className="posterDelete__container">
                                    <span className='item__poster'>{item?.user?.fullName}</span>
                                    <span>{deleteButtonDisplay(item)}</span>
                                </div>
                                <div className='item__tag'>wants to share...</div>
                                <div className="nameType__container">
                                    <span className='item__name'>{item.itemName.toUpperCase()}</span>
                                    <span className='item__type'>{item?.itemType?.typeName.toUpperCase()}</span>
                                </div>
                                <div className='item__description'>{item.itemDescription}</div>
                                <button className="itemRespond__Button" onClick={() => navigate(`/itemResponse/create?itemPostId=${item.id}`)}>RESPOND</button>
                            </section>
                        </>
                    }
                )
            }
        </article>
    </>
}