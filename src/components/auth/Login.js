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
        <main className="login__container">
            <h1 className="login__logo">COMMUNITYLINK</h1>

            <section>
                <form className="login__form" onSubmit={handleLogin}>
                    <fieldset className="login__emailField">
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="login__email"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>


                    <fieldset className="loginForm__buttons">
                        <button type="submit" className="login__submit">
                            <span>LOG IN</span>
                        </button>

                        <span className="login__registerContainer">
                            <Link className="login__register" to="/register" >REGISTER</Link>
                        </span>
                    </fieldset>

                </form>

            </section>
        </main>
    )
}