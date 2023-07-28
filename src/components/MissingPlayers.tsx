import { Container, Divider, HStack, Input, InputGroup, InputLeftAddon, Text, VStack } from "@chakra-ui/react";
import { useAppSelector } from "../store/hooks";
import { FaUserCheck } from "react-icons/fa6";
import { CustomIcon } from "./Shared/CustomIcon";

export const MissingPlayers = () => {
    const { gameMetaData } = useAppSelector((state) => state.game);
    const { playerMetaData } = useAppSelector((state) => state.player);

    return (
        <Container height='100%' alignItems='center' maxW='lg' display='flex' justifyContent='center'>
            <VStack spacing={6} backgroundColor='white' alignItems='start' borderRadius={10} p={6} width='100%' border='1px solid teal'>
                <HStack justifyContent='space-between' width='100%' alignItems='center'>
                    <Text fontSize='20px' fontWeight='500' textAlign='left' className='loading'>
                        Venter på deltagere
                    </Text>
                    <Text fontSize='12px' fontWeight='bold' textAlign='left'>
                        {gameMetaData?.currentPlayers.length} / {gameMetaData?.requiredPlayers}
                    </Text>
                </HStack>
                {playerMetaData?.isAdmin ? (
                    <InputGroup size='sm'>
                        <InputLeftAddon children='Nøgle' />
                        <Input type='text' readOnly value={gameMetaData?.key} />
                    </InputGroup>
                ) : null}

                <Divider />
                <VStack spacing={2} alignItems='flex-start'>
                    {gameMetaData?.currentPlayers.map((player) => (
                        <Text key={player.username} display='flex' alignItems='center' gap='5px'>
                            <CustomIcon icon={FaUserCheck} />
                            {player.username}
                        </Text>
                    ))}
                </VStack>
            </VStack>
        </Container>
    );
};
