import { finishGame, removePlayerFromGame } from "../helpers/firestoreHelpers";
import { clearGameData } from "../store/slices/gameSlice";
import { clearPlayerData } from "../store/slices/playerSlice";
import { Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const LeaveGameBtn = () => {
    const dispatch = useAppDispatch();

    const { key, gameDocId } = useAppSelector((state) => state.game);
    const { username, playerMetaData } = useAppSelector((state) => state.player);

    const handleLeaveGame = async () => {
        dispatch(clearGameData());
        dispatch(clearPlayerData());

        if (playerMetaData?.isAdmin) {
            return await finishGame(gameDocId!);
        }

        await removePlayerFromGame(username!, key!);
    };

    if (!key || !username) return <></>;

    return (
        <Button position='absolute' colorScheme='teal' variant='outline' top={5} right={5} onClick={handleLeaveGame}>
            {playerMetaData?.isAdmin ? "Afslut spil" : "Forlad spil"}
        </Button>
    );
};
