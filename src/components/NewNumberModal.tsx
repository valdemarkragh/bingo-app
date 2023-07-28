import { Button, Divider, Modal, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { updateNumberModalOpen } from "../helpers/firestoreHelpers";
import { getRowNumbers } from "../helpers/bingoPlateHelpers";
import { useAppSelector } from "../store/hooks";

export const NewNumberModal = () => {
    const { gameMetaData, gameDocId } = useAppSelector((state) => state.game);
    const { playerMetaData } = useAppSelector((state) => state.player);

    if (!gameMetaData || !playerMetaData) return <></>;

    const handleModalClose = async () => {
        if (!playerMetaData.isAdmin) return;

        await updateNumberModalOpen(false, gameDocId!);
    };

    const playerHasNumber = () => {
        const parsedBingoPlate = JSON.parse(playerMetaData.bingoPlate) as (number | null)[][];

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

        const lastPickedNumber = gameMetaData.pickedNumbers[gameMetaData.pickedNumbers.length - 1];

        if (allPlayerNumbers.includes(lastPickedNumber)) {
            return (
                <Text color='green.600' letterSpacing={1}>
                    Tillykke! Du har tallet på din plade
                </Text>
            );
        }
        return <></>;
    };

    return (
        <Modal isOpen={gameMetaData.numberModalOpen && !gameMetaData.winnerModalOpen} onClose={async () => await handleModalClose()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign='center'>
                    <Text fontSize='lg'>Der blev trukket et nyt tal!</Text>
                    {playerHasNumber()}
                    <Divider mt={3} />
                    <Text fontSize='60px'>{gameMetaData.pickedNumbers[gameMetaData.pickedNumbers.length - 1]}</Text>
                    {playerMetaData.isAdmin ? (
                        <>
                            <Text fontSize='xs' mb='3'>
                                Denne besked bliver vist til alle deltagere
                            </Text>
                            <Text fontSize='xs' mb='3'>
                                Beskeden kan kun lukkes af dig
                            </Text>
                            <Button colorScheme='teal' width='100%' onClick={async () => await handleModalClose()}>
                                Fortsæt
                            </Button>
                        </>
                    ) : null}
                </ModalHeader>
            </ModalContent>
        </Modal>
    );
};
