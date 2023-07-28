import { Outlet } from "react-router-dom";
import "../style.css";
import { Box } from "@chakra-ui/react";
import { FirestoreProvider } from "../context/firestoreContext";

export const BingoLayout = () => {
    return (
        <FirestoreProvider>
            <Box className='app'>
                <Outlet />
            </Box>
        </FirestoreProvider>
    );
};
