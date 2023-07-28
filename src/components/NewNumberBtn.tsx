import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { StartGameBtn } from "./StartGameBtn";
import { useFirestoreContext } from "../context/firestoreContext";
import { useCustomMediaQuery } from "../hooks/useCustomMediaQuery";

export const NewNumberBtn = () => {
    const { player, game, handlePickNumber, bingoNumbers } = useFirestoreContext();
    const { isMobile } = useCustomMediaQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement | null>(null);

    return (
        <>
            <Box display='flex' gap='10px'>
                <StartGameBtn />
                {player.data?.isAdmin && game.data?.started ? (
                    <Button colorScheme='teal' onClick={async () => handlePickNumber()}>
                        {isMobile ? "Træk nummer" : "Træk nyt nummer"}
                    </Button>
                ) : null}
                {game.data?.started ? (
                    <Button colorScheme='teal' ref={btnRef} onClick={onOpen}>
                        {isMobile ? "Se numre" : "Se trukkede numre"}
                    </Button>
                ) : null}
            </Box>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} size='full'>
                <DrawerOverlay />
                <DrawerContent backgroundColor='teal.700'>
                    <DrawerCloseButton color='white' />
                    <DrawerHeader color='white' fontSize='2xl'>
                        Trukkede numre
                        <Divider />
                    </DrawerHeader>
                    <DrawerBody>
                        <Grid templateColumns={`repeat(${isMobile ? "4" : "15"}, 1fr)`} gap={1}>
                            {bingoNumbers.map((num) => (
                                <GridItem
                                    key={num}
                                    w='100%'
                                    h='20'
                                    bg={game.data?.pickedNumbers.includes(num) ? "teal.500" : "white"}
                                    color={game.data?.pickedNumbers.includes(num) ? "white" : "teal.500"}
                                    border={`1px solid ${game.data?.pickedNumbers.includes(num) ? "transparent" : "teal"}`}
                                    borderRadius={0}
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    fontSize={20}
                                    fontWeight='500'>
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
