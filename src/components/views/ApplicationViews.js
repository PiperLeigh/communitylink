import { Route, Routes, Outlet } from "react-router-dom"
import { ItemsList } from "../items/ItemsList"
import { RequestList } from "../requests/RequestList"
import { RequestPostForm } from "../requests/RequestPostForm"
import { RequestResponseForm } from "../requests/RequestResponseForm"


export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>
                <Route path="be-a-neighbor" element={<RequestList />} />
                <Route path="requestPost/create" element={<RequestPostForm />} />
                <Route path="requestResponse/create" element={<RequestResponseForm />} />
                <Route path="free-store" element={<ItemsList />} />
            </Route>
        </Routes>
    )

}
