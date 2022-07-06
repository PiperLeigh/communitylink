import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ResponseList.css"

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
                    {user.fullName}!!!
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
        <main className="userPage_container">

            <div className="welcome">
                <p className="para_welcome">Welcome,</p>
                <p className="para_user">{WelcomeMessage()}</p>
            </div>
            <article className="userPage">
                {
                    itemResponses.map(
                        (itemResponse) => {
                            if (itemResponse.itemPost.userId === CommunityLinkUserObject.id && itemResponse.userId !== CommunityLinkUserObject.id) {
                                return <>
                                    <section className='itemResponse' key={itemResponse.id}>
                                        <div>
                                            <span><button className="itemResponse_delete" onClick={() => deleteItemButtn(itemResponse)}>x</button></span>
                                            <header className='itemResponse_poster'>{itemResponse?.user?.fullName}</header>
                                        </div>

                                        <div className='itemResponse_tag'>RESPONDING TO POST ABOUT {itemResponse.itemPost.itemName.toUpperCase()}</div>
                                        <div className='itemResponse_body'>{itemResponse.responseBody}</div>
                                        <button className="itemResponse_respond" onClick={() => navigate(`/itemResponse/create?itemPostId=${itemResponse.itemPost.id}&previousPage=/`)}>RESPOND</button>
                                    </section>
                                </>
                            }
                        }
                    )
                }
                {
                    requestResponses.map(
                        (requestResponse) => {
                            if (requestResponse.requestPost.userId === CommunityLinkUserObject.id && requestResponse.userId !== CommunityLinkUserObject.id) {
                                return <section className='requestResponse' key={requestResponse.id}>
                                    <div>
                                        <span><button className="requestResponse__delete" onClick={() => deleteRqstResponseButtn(requestResponse)}>x</button></span>
                                        <header className='requestResponse__poster'>{requestResponse?.user?.fullName}</header>
                                    </div>
                                    <div className='requestResponse__tag'>RESPONDING TO {requestResponse.requestPost.requestTopic.toUpperCase()} REQUEST</div>
                                    <div className='requestResponse__body'>{requestResponse.responseBody}</div>
                                    <button className='requestResponse__respond' onClick={() => navigate(`/requestResponse/create?requestPostId=${requestResponse.requestPost.id}&previousPage=/`)}>RESPOND</button>
                                </section>
                            }
                        }
                    )
                }

            </article>
        </main>
    </>

    )

}