import { Outlet } from "react-router-dom";
import "../style.css";
import { LeaveGameBtn } from "../components/LeaveGameBtn";
import { Container } from "@chakra-ui/react";

export const RootLayout = () => {
    return (
        <div className='app'>
            <Container maxW='container.md'>
                <LeaveGameBtn />
                <Outlet />
            </Container>
        </div>
    );
};
