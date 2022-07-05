import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return ( 
        <div className="navbar_itemsContainer">
        <div><Link className="navbar__logo" to="/" >COMMUNITYLINK</Link></div>
        <ul className="navbar_items">
            <li>
            <Link className="navbar__link" to="/be-a-neighbor">be a neighbor</Link>
            </li>
            <li>
            <Link className="navbar__link" to="/free-store">free store</Link>
            </li>
            { //Build link for logout
                localStorage.getItem("communitylink_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => { 
                            localStorage.removeItem("communitylink_user")
                            navigate("/", {replace: true})
                        }}>logout</Link> 
                    </li>
                    : ""
            }
        </ul>
        </div>
    )
}