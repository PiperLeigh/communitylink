import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ResponseList = () => {
    const [requestResponses, setRequestResponses] = useState([])
    const [itemResponses, setItemResponses] = useState([])

    const navigate= useNavigate()

    useEffect(
        () => {
            fetch('http://localhost:8088/requestResponses?_expand=user')
                .then(response => response.json())
                .then((requestResponseArray) => {
                    setRequestResponses(requestResponseArray)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch('http://localhost:8088/itemResponses?_expand=user')
                .then(response => response.json())
                .then((itemResponseArray) => {
                    setItemResponses(itemResponseArray)
                })
        },
        []
    )

    return (
        <article className="requestResponses">
            {
                requestResponses.map(
                    (requestResponse) => {
                        return <>
                            <header className='requestResponse_poster'>{requestResponse?.user?.fullName}</header>
                            <div>responding to neighbor request</div>
                            <div>{requestResponse.responseBody}</div>
                            <button onClick={() => navigate("/requestResponse/create")}>RESPOND</button>
                        </>
                    }
                )
            }

            {
                itemResponses.map(
                    (itemResponse) => {
                        return <>
                            <header className='itemResponse_poster'>{itemResponse?.user?.fullName}</header>
                            <div>responding to item post</div>
                            <div>{itemResponse.responseBody}</div>
                            <button onClick={() => navigate("/itemResponse/create")}>RESPOND</button>
                        </>
                    }
                )
            }
        </article>
    )
}



