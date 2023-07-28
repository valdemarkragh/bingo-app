import { Button, Modal, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { finishGame, updateWinnerModalOpen } from "../helpers/firestoreHelpers";
import { useAppSelector } from "../store/hooks";
import { CustomIcon } from "./Shared/CustomIcon";
import { FaTrophy } from "react-icons/fa6";

export const WinnerModal = () => {
    const { gameMetaData, gameDocId } = useAppSelector((state) => state.game);
    const { playerMetaData } = useAppSelector((state) => state.player);

    if (!gameMetaData || !playerMetaData) return <></>;

    const handleModalClose = async () => {
        if (!playerMetaData.isAdmin) return;

        if (gameMetaData.rowsDone === 3) {
            await finishGame(gameDocId!);
        }

        await updateWinnerModalOpen(false, gameDocId!);
    };

    return (
        <Modal isOpen={gameMetaData.winnerModalOpen} onClose={async () => await handleModalClose()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign='center'>
                    <VStack spacing={4}>
                        <CustomIcon icon={FaTrophy} size={12} props={{ color: "teal.500" }} />
                        <Text fontSize='xl'>
                            Der er fundet en vinder for {gameMetaData.rowsDone} {gameMetaData.rowsDone === 1 ? "række" : "rækker"}!
                        </Text>
                        <Text fontSize='lg'>Tillykke til {gameMetaData.winners[gameMetaData.winners.length - 1]?.username}!</Text>
                        {playerMetaData.isAdmin ? (
                            <>
                                <Text fontSize='xs'>Denne besked bliver vist til alle deltagere</Text>
                                <Text fontSize='xs'>Beskeden kan kun lukkes af dig</Text>
                                <Button colorScheme='teal' width='100%' onClick={async () => await handleModalClose()}>
                                    {gameMetaData.rowsDone === 3 ? "Afslut spil" : "Fortsæt"}
                                </Button>
                            </>
                        ) : null}
                    </VStack>
                </ModalHeader>
            </ModalContent>
        </Modal>
    );
};
