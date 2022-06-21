import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ItemsList = () => {
    const [items, setItems] = useState([])
    
    const navigate= useNavigate()
        
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
        return <button onClick={() => deleteButtonFunction(item)} className="item__delete">DELETE</button>
    }
}

const deleteButtonFunction = (item) => {
    return fetch(`http://localhost:8088/itemPosts/${item.id}`, {
        method: "DELETE"
    }).then(fetchPosts)
}


    return <>
    <button onClick={() => navigate("/itemPost/create")}>GIVE</button>
    <article className="items">
        {
            items.map(
                (item) => {
                    return <>
                        <section className='item' key={item.id}>
                            <header className='item_poster'>{item?.user?.fullName}</header>
                            <div className='item_name'>{item.itemName.toUpperCase()}</div>
                            <div className='item_type'>TO {item?.itemType?.typeName.toUpperCase()}</div>
                            <div className='item_description'>{item.itemDescription}</div>
                            <button onClick={() => navigate(`/itemResponse/create?itemPostId=${item.id}`)}>RESPOND</button>
                            {deleteButtonDisplay(item)}
                        </section>
                    </>
                }
            )
        }
    </article>
    </>
}