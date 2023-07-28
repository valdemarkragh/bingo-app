import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Text, VStack } from "@chakra-ui/react";
import { BingoPlate } from "./BingoPlate/BingoPlate";
import { CustomIcon } from "./Shared/CustomIcon";
import { FaCircleXmark, FaUsers, FaUser } from "react-icons/fa6";
import { useFirestoreContext } from "../context/firestoreContext";
import { useCustomMediaQuery } from "../hooks/useCustomMediaQuery";

export const Players = () => {
    const { game, player, handleKickPlayer } = useFirestoreContext();
    const { isMobile, isTablet } = useCustomMediaQuery();

    return (
        <VStack spacing={2} alignItems='start' width='100%'>
            <Text fontSize='lg' fontWeight='bold' color='white' display='flex' alignItems='center' gap='5px'>
                <CustomIcon icon={FaUsers} />
                Deltagere
            </Text>
            {isMobile ? (
                <Accordion width='100%' allowToggle>
                    {game.data?.currentPlayers
                        .filter((p) => p.username !== player.data?.username)
                        .map((player) => (
                            <AccordionItem color='white' backgroundColor='teal.600'>
                                <AccordionButton>
                                    <Box as='span' flex='1' textAlign='left' display='flex' gap='5px' alignItems='center'>
                                        <CustomIcon icon={FaUser} />
                                        {player.username}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel py={4}>
                                    <BingoPlate bingoPlate={player.bingoPlate} isExternalPlate />
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                </Accordion>
            ) : (
                <Box display='flex' width='100%' gap={5} flexWrap='wrap'>
                    {game.data?.currentPlayers
                        .filter((p) => p.username !== player.data?.username)
                        .map((p) => (
                            <VStack alignItems='start' key={p.username} width={isTablet ? "35%" : "25%"}>
                                <Badge fontSize='sm' background='teal.900' p={2} display='flex' alignItems='center' justifyContent='space-between' color='white' width='100%'>
                                    {p.username}
                                    {player.data?.isAdmin ? (
                                        <CustomIcon icon={FaCircleXmark} aria-label='Remove player' size={5} props={{ cursor: "pointer", onClick: async () => await handleKickPlayer(p.playerId) }} />
                                    ) : null}
                                </Badge>
                                <BingoPlate bingoPlate={p.bingoPlate} isExternalPlate />
                            </VStack>
                        ))}
                </Box>
            )}
        </VStack>
    );
};
