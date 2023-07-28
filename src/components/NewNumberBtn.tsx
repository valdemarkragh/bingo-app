import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Grid, GridItem, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { updateNumberModalOpen, updatePickedNumbers } from "../helpers/firestoreHelpers";
import { useRef } from "react";
import { useAppSelector } from "../store/hooks";
import { StartGameBtn } from "./StartGameBtn";

export const NewNumberBtn = () => {
    const [isMobile] = useMediaQuery("(max-width: 800px)");
    const { playerMetaData } = useAppSelector((state) => state.player);
    const { gameMetaData, gameDocId } = useAppSelector((state) => state.game);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const handleNewNumber = async () => {
        await updatePickedNumbers(gameMetaData?.pickedNumbers ?? [], gameDocId!);
        await updateNumberModalOpen(true, gameDocId!);
    };

    const numbersArray = Array.from({ length: 91 }, (_, index) => index);

    return (
        <>
            <Box display='flex' gap='10px'>
                <StartGameBtn />
                {playerMetaData?.isAdmin && gameMetaData?.started ? (
                    <Button colorScheme='teal' onClick={handleNewNumber}>
                        Træk nyt nummer
                    </Button>
                ) : null}
                {gameMetaData?.started ? (
                    <Button colorScheme='teal' ref={btnRef} onClick={onOpen}>
                        Se trukkede numre
                    </Button>
                ) : null}
            </Box>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} size='full'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Trukkede numre</DrawerHeader>
                    <DrawerBody>
                        <Grid templateColumns={`repeat(${isMobile ? "4" : "15"}, 1fr)`} gap={0}>
                            {numbersArray.map((num) => (
                                <GridItem
                                    key={num}
                                    w='100%'
                                    h='20'
                                    bg={gameMetaData?.pickedNumbers.includes(num) ? "teal.400" : "white"}
                                    color={gameMetaData?.pickedNumbers.includes(num) ? "white" : "teal.400"}
                                    border={`1px solid ${gameMetaData?.pickedNumbers.includes(num) ? "white" : "teal"}`}
                                    borderRadius={0}
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    fontSize={20}>
                                    {num}
                                </GridItem>
                            ))}
                        </Grid>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};
