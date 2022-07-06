import { Route, Routes, Outlet } from "react-router-dom"
import { RequestList } from "../requests/RequestList"
import { RequestPostForm } from "../requests/RequestPostsForm"
import { RequestResponseForm } from "../requests/RequestResponseForm"
import { ItemsList } from "../items/ItemsList"
import { ItemResponseForm } from "../items/ItemResponseForm"
import { ItemPostForm } from "../items/ItemPostsForm"
import { ResponseList } from "../userpage/ResponseList"


export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/" element={
               
               
                <>
                    <Outlet />
                </>
            }>
                <Route path="/" element={<ResponseList />} />
                <Route path="be-a-neighbor" element={<RequestList />} />
                <Route path="requestPost/create" element={<RequestPostForm />} />
                <Route path="requestResponse/create" element={<RequestResponseForm />} />
                <Route path="free-store" element={<ItemsList />} />
                <Route path="itemPost/create" element={<ItemPostForm />} />
                <Route path="itemResponse/create" element={<ItemResponseForm />} />
            </Route>
        </Routes>
    )

}


