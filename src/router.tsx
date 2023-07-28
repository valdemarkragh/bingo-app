import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { BingoGame } from "./pages/BingoGame";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/game' element={<BingoGame />} />
        </Route>
    )
);

export default router;
