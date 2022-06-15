import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const RequestList = () => {
    const [requests, setRequests] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch('http://localhost:8088/requestPosts?_expand=user')
                .then(response => response.json())
                .then((requestArray) => {
                    setRequests(requestArray)
                })
        },
        []
    )

    const localCommunityLinkUser = localStorage.getItem("communitylink_user")
    const CommunityLinkUserObject = JSON.parse(localCommunityLinkUser)

    const myPost = () => {
        if (requests.userId === CommunityLinkUserObject.id) {
            return <button className="item__delete">DELETE</button>
        } 
        else {
            return ""
        }
    } 
    
    const closeTicket = () => {
        const copy = {
            userId: requests.userId, 
            requestTopic: requests.requestTopic,
            requestDescription: requests.requestDescription,
            urgent: requests.urgent
        }
    }


    return <>
        <button onClick={() => navigate("/requestPost/create")}>PLEASE REACH OUT</button>
        <article className="requests">
            {
                requests.map(
                    (request) => {
                        return <>
                            <section className='request' key={request.id}>
                                <header className='request_poster'>{request?.user?.fullName}</header>
                                <div className='request_tag'>needs a hand...</div>
                                <div className='request_topic'>{request.requestTopic}</div>
                                <div className='request_description'>{request.requestDescription}</div>
                                <footer className='request_urgent'>{request.urgent ? "URGENT!" : ""}</footer>
                                <button onClick={() => navigate("/requestResponse/create")}>RESPOND</button>
                            </section>
                        </>
                    }
                )
            }
        </article>
        <div></div>
    </>
}