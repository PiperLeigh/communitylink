import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ResponseList = () => {
    const [requestResponses, setRequestResponses] = useState([])
    const [itemResponses, setItemResponses] = useState([])
    const [users, setUsers] = useState([])
    const localCommunityLinkUser = localStorage.getItem("communitylink_user")
    const CommunityLinkUserObject = JSON.parse(localCommunityLinkUser)
    const navigate = useNavigate()

    const WelcomeMessage = () => {
        const fetchUsers = () => {
            fetch('http://localhost:8088/users')
                .then(response => response.json())
                .then((usersArray) => {
                    setUsers(usersArray)
                })
        }

        useEffect(fetchUsers, [])

        for (const user of users)
            if (CommunityLinkUserObject.id === user.id)
                return <div>
                    Welcome, {user.fullName}!!!
                </div>
    }

    
    const fetchRequestResponses = () => {
        fetch(`http://localhost:8088/requestResponses?_expand=requestPost&_expand=user`)
            .then(response => response.json())
            .then((requestResponseArray) => {
                setRequestResponses(requestResponseArray)
            })
    }
   
    useEffect(fetchRequestResponses, [])


    const deleteRqstResponseButtn = (requestResponse) => {
        return fetch(`http://localhost:8088/requestResponses/${requestResponse.id}`, {
            method: "DELETE"
        }).then(fetchRequestResponses)
    }


    const fetchItemResponses = () => {
        fetch(`http://localhost:8088/itemResponses?_expand=itemPost&_expand=user`)
            .then(response => response.json())
            .then((itemResponseArray) => {
                setItemResponses(itemResponseArray)
            })
    }
    useEffect(fetchItemResponses, [])

    const deleteItemButtn = (itemResponse) => {
        return fetch(`http://localhost:8088/itemResponses/${itemResponse.id}`, {
            method: "DELETE"
        }).then(fetchItemResponses)
    }

    return (<>
            <article className="userPage">
                <h1>{WelcomeMessage()}</h1>
                
                <h3>HELP REQUEST MESSAGES</h3>
                {
                    requestResponses.map(
                        (requestResponse) => {
                            if (requestResponse.requestPost.userId === CommunityLinkUserObject.id){
                            return <section className='requestResponse' key={requestResponse.id}>
                                <header className='requestResponse_poster'>{requestResponse?.user?.fullName}</header>
                                <div>RESPONDING TO {requestResponse.requestPost.requestTopic.toUpperCase()} REQUEST</div>
                                <div>{requestResponse.responseBody}</div>
                                <button onClick={() => navigate("/requestResponse/create")}>RESPOND</button>
                                <button onClick={() => deleteRqstResponseButtn(requestResponse)} className="item__delete">DELETE</button>
                            </section>} 
                        } 
                    )
                }
                <h3>FREE STORE MESSAGES</h3>
                {
                    itemResponses.map(
                        (itemResponse) => {
                            if (itemResponse.itemPost.userId === CommunityLinkUserObject.id)
                            {return <>
                                <section className='itemResponse' key={itemResponse.id}>
                                    <header className='itemResponse_poster'>{itemResponse?.user?.fullName}</header>
                                    <div>RESPONDING TO POST FOR {itemResponse.itemPost.itemName.toUpperCase()}</div>
                                    <div>{itemResponse.responseBody}</div>
                                    <button onClick={() => navigate("/itemResponse/create")}>RESPOND</button>
                                    <button onClick={() => deleteItemButtn(itemResponse)} className="item__delete">DELETE</button>
                                </section>
                            </>}
                        }
                    )
                }
                
            </article>
    </>

    )

}



