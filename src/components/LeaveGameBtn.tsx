import { Button, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Text, Divider } from "@chakra-ui/react";
import { CustomIcon } from "./Shared/CustomIcon";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { useFirestoreContext } from "../context/firestoreContext";
import { useCustomMediaQuery } from "../hooks/useCustomMediaQuery";

export const LeaveGameBtn = () => {
    const { player, handleLeaveGame } = useFirestoreContext();
    const { isMobile } = useCustomMediaQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button colorScheme='red' variant='solid' onClick={onOpen} display='flex' alignItems='center' gap='10px'>
                {!isMobile ? (player.data?.isAdmin ? "Afslut spil" : "Forlad spil") : null}
                <CustomIcon size={5} icon={FaPersonWalkingArrowRight} />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='lg'>
                <ModalOverlay />
                <ModalContent textAlign='center'>
                    <ModalHeader>
                        <Text fontSize='xl'>{player.data?.isAdmin ? "Er du sikker på at du vil afslutte spillet?" : "Er du sikker på at du vil forlade spillet?"}</Text>
                        <Divider mt={3} />
                        <Button colorScheme='teal' width='100%' onClick={async () => await handleLeaveGame()}>
                            Fortsæt
                        </Button>
                    </ModalHeader>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>
        </>
    );
};
