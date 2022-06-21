import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const RequestList = () => {
    const [requests, setRequests] = useState([])

    const navigate = useNavigate()

    const fetchPosts = () => {
        fetch('http://localhost:8088/requestPosts?_expand=user')
            .then(response => response.json())
            .then((requestArray) => {
                setRequests(requestArray.filter(request => request.user.zip === CommunityLinkUserObject.zip))
            })
    }

    useEffect(fetchPosts, [])

    const localCommunityLinkUser = localStorage.getItem("communitylink_user")
    const CommunityLinkUserObject = JSON.parse(localCommunityLinkUser)

    const deleteButtonDisplay = (request) => {
        if (request.userId === CommunityLinkUserObject.id) {
            return <button onClick={() => deleteButtonFunction(request)} className="request__delete">DELETE</button>
        }
    }

    const deleteButtonFunction = (request) => {
        return fetch(`http://localhost:8088/requestPosts/${request.id}`, {
            method: "DELETE"
        }).then(fetchPosts)
    }


    return <>
        <button onClick={() => navigate("/requestPost/create")}>PLEASE REACH OUT</button>
        <article className="requests">
            {
                requests
                // .filter(request => request.user.zip === CommunityLinkUserObject.zip)
                .map(
                    (request) => {
                        // if (request.user.zip === CommunityLinkUserObject.zip) {
                            return <>
                                <section className='request' key={request.id}>
                                    <header className='request_poster'>{request?.user?.fullName}</header>
                                    <div className='request_tag'>needs a hand...</div>
                                    <div className='request_topic'>{request.requestTopic}</div>
                                    <div className='request_description'>{request.requestDescription}</div>
                                    <footer className='request_urgent'>{request.urgent ? "URGENT!" : ""}</footer>
                                    <button onClick={() => navigate(`/requestResponse/create?requestPostId=${request.id}`)}>RESPOND</button>
                                    {deleteButtonDisplay(request)}
                                </section>
                            </>
                        // }
                    }
                )
            }
        </article>
        <div></div>
    </>
}