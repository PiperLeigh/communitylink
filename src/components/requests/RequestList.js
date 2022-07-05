import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./RequestList.css"

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
            return <button onClick={() => deleteButtonFunction(request)} className="request__delete">x</button>
        }
    }

    const deleteButtonFunction = (request) => {
        return fetch(`http://localhost:8088/requestPosts/${request.id}`, {
            method: "DELETE"
        }).then(fetchPosts)
    }


    return <>
        <main className="requestList__container">
        <div className="button__div">
                <button className='reachOut_button' onClick={() => navigate("/requestPost/create")}>PLEASE REACH OUT</button>
            </div>
            <article className="requests">
                {
                    requests
                        // .filter(request => request.user.zip === CommunityLinkUserObject.zip)
                        .map(
                            (request) => {
                                // if (request.user.zip === CommunityLinkUserObject.zip) {
                                return <>
                                    <section className='requests__container'>
                                        <section className='request' key={request.id}>
                                            <div className='request__posterTag'>
                                                <div>
                                                    <span className="request__poster">{request.user.fullName}</span>
                                                    <span className="delete__button">{deleteButtonDisplay(request)}</span>
                                                </div>
                                                <div className='request__tag'>needs a hand...</div>
                                            </div>
                                            <div>
                                                <div className='request__topic'>{request.requestTopic}</div>
                                                <div className='request__description'>{request.requestDescription}</div>
                                                <div className='request__urgent'>{request.urgent ? "URGENT!" : ""}</div>
                                            </div>
                                            <button className='requestRespond__button' onClick={() => navigate(`/requestResponse/create?requestPostId=${request.id}`)}>RESPOND</button>
                                        </section>
                                    </section>
                                </>
                            }
                        )
                }
            </article>
        </main>
    </>
}