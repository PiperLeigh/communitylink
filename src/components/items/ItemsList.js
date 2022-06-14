import { useEffect, useState } from "react"

export const ItemsList = () => {
    const [items, setItems] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/itemPosts?_expand=user&_expand=itemType')
                .then(response => response.json())
                .then((itemsArray) => {
                    setItems(itemsArray)
                })
        },
        []
    )

    return <article className="items">
        {
            items.map(
                (item) => {
                    return <>
                        <section className='item' key={item.id}>
                            <header className='item_poster'>{item?.user?.fullName}</header>
                            <div className='item_name'>{item.itemName.toUpperCase()}</div>
                            <div className='item_type'>TO {item?.itemType?.typeName.toUpperCase()}</div>
                            <div className='item_description'>{item.itemDescription}</div>
                            <button>RESPOND</button>
                        </section>
                    </>
                }
            )
        }
    </article>
}