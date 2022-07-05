import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import "./Register.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        zip: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("communitylink_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main className="register__container">
            <h1 className="register__logo">COMMUNITYLINK</h1>
            <form className="register__form" onSubmit={handleRegister}>
                <fieldset className="field">
                    <input onChange={updateUser}
                        type="text" id="fullName" className="register__name"
                        placeholder="Hello, what's your name?" required autoFocus />
                </fieldset>
                <fieldset className="field">
                    <input onChange={updateUser}
                        type="email" id="email" className="register__email"
                        placeholder="What is your email?" required />
                </fieldset>
                <fieldset className="field">
                    <input onChange={updateUser}
                        type="text" pattern="[0-9]{5}" id="zip" className="register__zip"
                        placeholder="What is your zip code?" required />
                </fieldset>

                <fieldset className="field registerButtons">
                    <button type="submit" className="register__submit">
                        <span>REGISTER</span>
                    </button>
                    <span className="register__loginContainer"><Link to="/login" className="register__login">LOG IN</Link></span>
                </fieldset>
            </form>
        </main>
    )
}