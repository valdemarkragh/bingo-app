import { Button, Divider, Modal, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { getRowNumbers } from "../helpers/bingoPlateHelpers";
import { useFirestoreContext } from "../context/firestoreContext";

export const NewNumberModal = () => {
    const { player, game, handleNumberModalClose } = useFirestoreContext();

    const playerHasNumber = () => {
        if (!player.data || !game.data) return <></>;

        const parsedBingoPlate = JSON.parse(player.data?.bingoPlate) as (number | null)[][];

        const allPlayerNumbers = [
            ...(getRowNumbers(parsedBingoPlate, 1)
                .filter((row) => row !== null)
                .map((row) => row) as number[]),
            ...(getRowNumbers(parsedBingoPlate, 2)
                .filter((row) => row !== null)
                .map((row) => row) as number[]),
            ...(getRowNumbers(parsedBingoPlate, 3)
                .filter((row) => row !== null)
                .map((row) => row) as number[]),
        ];

        const lastPickedNumber = game.data.pickedNumbers[game.data.pickedNumbers.length - 1];

        if (allPlayerNumbers.includes(lastPickedNumber)) {
            return (
                <Text color='teal.600' letterSpacing={1}>
                    Tillykke! Du har tallet på din plade
                </Text>
            );
        }

        return <></>;
    };

    return (
        <Modal isOpen={Boolean(game.data?.numberModalOpen) && !game.data?.winnerModalOpen} onClose={async () => await handleNumberModalClose()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign='center'>
                    <Text fontSize='lg'>Der blev trukket et nyt tal!</Text>
                    {playerHasNumber()}
                    <Divider mt={3} />
                    <Text fontSize='60px'>{game.data?.pickedNumbers[game.data?.pickedNumbers.length - 1]}</Text>
                    {player.data?.isAdmin ? (
                        <>
                            <Text fontSize='xs' mb='3'>
                                Denne besked bliver vist til alle deltagere
                            </Text>
                            <Text fontSize='xs' mb='3'>
                                Beskeden kan kun lukkes af dig
                            </Text>
                            <Button colorScheme='teal' width='100%' onClick={async () => await handleNumberModalClose()}>
                                Fortsæt
                            </Button>
                        </>
                    ) : null}
                </ModalHeader>
            </ModalContent>
        </Modal>
    );
};
