import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { BingoPlate } from "./BingoPlate/BingoPlate";
import { useAppSelector } from "../store/hooks";
import { CustomIcon } from "./Shared/CustomIcon";
import { FaUser } from "react-icons/fa6";

export const Players = () => {
    const [isMobile] = useMediaQuery("(max-width: 800px)");
    const { gameMetaData } = useAppSelector((state) => state.game);
    const { playerMetaData } = useAppSelector((state) => state.player);

    return (
        <VStack spacing={2} alignItems='start' width='100%'>
            <Text fontSize='lg' fontWeight='bold'>
                Deltagere
            </Text>
            {isMobile ? (
                <Accordion width='100%' allowToggle>
                    {gameMetaData?.currentPlayers
                        .filter((player) => player.username !== playerMetaData?.username)
                        .map((player) => (
                            <AccordionItem>
                                <AccordionButton paddingInline={0}>
                                    <Box as='span' flex='1' textAlign='left'>
                                        {player.username}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel py={4} px={0}>
                                    <BingoPlate bingoPlate={player.bingoPlate} isExternalPlate />
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                </Accordion>
            ) : (
                <Box display='flex' width='100%' gap={5} flexWrap='wrap'>
                    {gameMetaData?.currentPlayers
                        .filter((player) => player.username !== playerMetaData?.username)
                        .map((player) => (
                            <VStack alignItems='start' key={player.username} width='25%'>
                                <Text fontSize='sm' display='flex' alignItems='center' gap='5px'>
                                    <CustomIcon icon={FaUser} />
                                    {player.username}
                                </Text>
                                <BingoPlate bingoPlate={player.bingoPlate} isExternalPlate />
                            </VStack>
                        ))}
                </Box>
            )}
        </VStack>
    );
};
