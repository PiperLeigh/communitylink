import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ApplicationViews } from "./views/ApplicationViews"



export const CommunityLink = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route path="*" element={
			<Authorized>
				<>
				<NavBar />
				<ApplicationViews />
				</>
			</Authorized>
		} />
	</Routes>
}