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
        <main>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for COMMUNITYLINK</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                        type="text" id="fullName" className="form-control"
                        placeholder="Hello, what is your name?" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="What is your email?" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="zip"> Zip Code </label>
                    <input onChange={updateUser}
                        type="text" pattern="[0-9]{5}" id="zip" className="form-control"
                        placeholder="What is your zip code?" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
                <section className="link--register">
                    <Link to="/login">Already a member?</Link>
                </section>
            </form>
        </main>
    )
}