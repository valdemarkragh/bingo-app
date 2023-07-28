import { Button, Modal, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { CustomIcon } from "./Shared/CustomIcon";
import { FaTrophy } from "react-icons/fa6";
import { useFirestoreContext } from "../context/firestoreContext";

export const WinnerModal = () => {
    const { game, player, handleWinnerModalClose } = useFirestoreContext();

    return (
        <Modal isOpen={Boolean(game.data?.winnerModalOpen)} onClose={async () => await handleWinnerModalClose()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign='center'>
                    <VStack spacing={4}>
                        <CustomIcon icon={FaTrophy} size={12} props={{ color: "teal.500" }} />
                        <Text fontSize='xl'>
                            Der er fundet en vinder for {game.data?.rowsDone} {game.data?.rowsDone === 1 ? "række" : "rækker"}!
                        </Text>
                        <Text fontSize='lg'>Tillykke til {game.data?.winners[game.data?.winners.length - 1]?.username}!</Text>
                        {player.data?.isAdmin ? (
                            <>
                                <Text fontSize='xs'>Denne besked bliver vist til alle deltagere</Text>
                                <Text fontSize='xs'>Beskeden kan kun lukkes af dig</Text>
                                <Button colorScheme='teal' width='100%' onClick={async () => await handleWinnerModalClose()}>
                                    {game.data?.rowsDone === 3 ? "Afslut spil" : "Fortsæt"}
                                </Button>
                            </>
                        ) : null}
                    </VStack>
                </ModalHeader>
            </ModalContent>
        </Modal>
    );
};
