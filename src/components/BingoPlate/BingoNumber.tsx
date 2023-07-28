import { Box } from "@chakra-ui/react";
import { useFirestoreContext } from "../../context/firestoreContext";

export const BingoNumber = ({ num }: { num: number | null }) => {
    const { game } = useFirestoreContext();

    return (
        <Box color='teal.900' fontWeight='500' className={`bingo-num ${num && game.data?.pickedNumbers.includes(num) ? "picked" : ""}`}>
            {num ?? ""}
        </Box>
    );
};
