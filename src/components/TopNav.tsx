import { Box, Container } from "@chakra-ui/react";
import { NewNumberBtn } from "./NewNumberBtn";
import { LeaveGameBtn } from "./LeaveGameBtn";

export const TopNav = () => {
    return (
        <Box display='flex' py={3} background='teal.700'>
            <Container maxW='container.lg' display='flex' justifyContent='space-between'>
                <NewNumberBtn />
                <LeaveGameBtn />
            </Container>
        </Box>
    );
};
