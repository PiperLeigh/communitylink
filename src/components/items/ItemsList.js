import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ItemsList = () => {
    const [items, setItems] = useState([])

    const navigate= useNavigate()

    useEffect(
        () => {
            fetch('http://localhost:8088/itemPosts?_expand=user')
                .then(response => response.json())
                .then((itemsArray) => {
                    setItems(itemsArray)
                })
        },
        []
    )
        
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
                            <button onClick={() => navigate("/itemResponse/create")}>RESPOND</button>
                        </section>
                    </>
                }
            )
        }
    </article>
    </>
}




// const deleteButton = () => {
//     return <button onClick={() => {
//         fetch(`http://localhost:8088/itemPosts/${itemPostObject.id}`, {
//             method: "DELETE"
//         })
//         .then(() => {
//             setItems()
//         })
//     }}>Delete</button>
// }