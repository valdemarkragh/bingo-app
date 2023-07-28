import { Box, Button, Container, Divider, HStack, Text, Tooltip, VStack, useClipboard } from "@chakra-ui/react";
import { FaUserCheck } from "react-icons/fa6";
import { CustomIcon } from "./Shared/CustomIcon";
import { useFirestoreContext } from "../context/firestoreContext";
import { useCustomMediaQuery } from "../hooks/useCustomMediaQuery";

export const MissingPlayers = () => {
    const { game, player, handleLeaveGame } = useFirestoreContext();
    const { isMobile } = useCustomMediaQuery();
    const { onCopy, hasCopied } = useClipboard(game.data?.key ?? "");

    return (
        <Container minHeight='100dvh' alignItems='center' maxW='lg' display='flex' justifyContent='center' flexDirection='column'>
            <HStack justifyContent='space-between' width='100%' alignItems='center' color='white' backgroundColor='teal.700' p={3} px={5}>
                <Text fontSize={isMobile ? "xl" : "3xl"} fontWeight='500' textAlign='left' className='loading'>
                    Venter på deltagere
                </Text>
                <Text fontSize='lg' fontWeight='bold' textAlign='left'>
                    {game.data?.currentPlayers.length} / {game.data?.requiredPlayers}
                </Text>
            </HStack>
            <VStack spacing={6} backgroundColor='white' alignItems='start' p={6} width='100%' borderLeft='5px solid teal' borderBottom='5px solid teal' borderRight='5px solid teal'>
                {player.data?.isAdmin ? (
                    <>
                        <Box display='flex' alignItems='center' gap='10px'>
                            <Text fontSize='xl'>Nøgle</Text>

                            <Tooltip label={hasCopied ? "Kopieret!" : "Kopier nøgle"} closeOnClick={false}>
                                <Button fontSize='3xl' fontWeight='500' onClick={onCopy}>
                                    {game.data?.key}
                                </Button>
                            </Tooltip>
                        </Box>
                        <Divider />
                    </>
                ) : null}

                <VStack spacing={2} alignItems='flex-start'>
                    {game.data?.currentPlayers.map((player) => (
                        <Text key={player.username} display='flex' fontSize='xl' alignItems='center' gap='10px'>
                            <CustomIcon icon={FaUserCheck} />
                            {player.username}
                        </Text>
                    ))}
                </VStack>
                {player.data?.isAdmin ? (
                    <Button width='100%' colorScheme='red' onClick={async () => await handleLeaveGame()}>
                        Afslut spil
                    </Button>
                ) : null}
            </VStack>
        </Container>
    );
};
