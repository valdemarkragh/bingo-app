import { useAppSelector } from "../store/hooks";
import { startGame } from "../helpers/firestoreHelpers";
import { Button } from "@chakra-ui/react";

export const StartGameBtn = () => {
    const { gameMetaData, gameDocId } = useAppSelector((state) => state.game);
    const { playerMetaData } = useAppSelector((state) => state.player);

    if (!playerMetaData?.isAdmin) return <></>;
    if (gameMetaData?.started) return <></>;

    const handleStartGame = async () => {
        await startGame(gameDocId!);
    };

    return (
        <Button colorScheme='teal' onClick={handleStartGame}>
            Start spil
        </Button>
    );
};
