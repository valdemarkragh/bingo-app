import { useFirestoreContext } from "../context/firestoreContext";
import { Button } from "@chakra-ui/react";

export const StartGameBtn = () => {
    const { player, game, handleStartGame } = useFirestoreContext();

    if (!player.data?.isAdmin) return <></>;
    if (game.data?.started) return <></>;

    return (
        <Button colorScheme='teal' onClick={handleStartGame}>
            Start spil
        </Button>
    );
};
