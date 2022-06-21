import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("Hello! Enter email here :)")
    const navigate = useNavigate()

    //When we click login button this function handles it
    const handleLogin = (e) => {
        e.preventDefault()
        //make fetch call to check API for users who match that email
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                //if it is a valid user/login
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    //In local storage set item of honey_user
                    localStorage.setItem("communitylink_user", JSON.stringify({
                        //with two properties of id and staff
                        id: user.id,
                        zip: user.zip
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>COMMUNITYLINK</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}