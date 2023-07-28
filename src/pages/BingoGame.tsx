import { Fragment } from "react";
import { BingoPlate } from "../components/BingoPlate/BingoPlate";
import { MissingPlayers } from "../components/MissingPlayers";
import { Box, Container, VStack } from "@chakra-ui/react";
import { Loader } from "../components/Loader";
import { NewNumberModal } from "../components/NewNumberModal";
import { Players } from "../components/Players";
import { WinnerModal } from "../components/WinnerModal";
import { TopNav } from "../components/TopNav";
import { useFirestoreContext } from "../context/firestoreContext";

export const BingoGame = () => {
    const { game, player } = useFirestoreContext();

    if (!game.data || !player.data) return <Loader />;

    if (game.data?.requiredPlayers > game.data?.currentPlayers.length) return <MissingPlayers />;

    return (
        <Fragment>
            <TopNav />
            <Container position='relative' height='100%' maxW='container.lg' pt={5}>
                <VStack pt={5} spacing={5} alignItems='start'>
                    <Players />
                    <Box width='100%' background='teal.600' p={3}>
                        <BingoPlate bingoPlate={player.data.bingoPlate} />
                    </Box>
                </VStack>
            </Container>
            <WinnerModal />
            <NewNumberModal />
        </Fragment>
    );
};
