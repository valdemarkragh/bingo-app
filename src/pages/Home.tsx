import { Box, Container, TabPanel, Tab, TabList, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { NewGameForm } from "../components/Forms/NewGameForm";
import { JoinGameForm } from "../components/Forms/JoinGameForm";
import { useCustomMediaQuery } from "../hooks/useCustomMediaQuery";

export const Home = () => {
    const { isMobile } = useCustomMediaQuery();

    return (
        <Container minHeight='100dvh' alignItems='center' maxW='container.sm' display='flex' justifyContent='center' flexDirection='column'>
            <Text color='white' fontSize={isMobile ? "3xl" : "5xl"} fontFamily="'Abril Fatface', cursive" backgroundColor='teal.700' width='100%' textAlign='center'>
                BankoBonanza
            </Text>
            <Box backgroundColor='white' width='100%' borderLeft='5px solid teal' borderBottom='5px solid teal' borderRight='5px solid teal'>
                <Tabs isFitted colorScheme='teal' variant='line'>
                    <TabList>
                        <Tab py={5} fontWeight='bold'>
                            Nyt spil
                        </Tab>
                        <Tab py={5} fontWeight='bold'>
                            Tilslut spil
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <NewGameForm />
                        </TabPanel>
                        <TabPanel>
                            <JoinGameForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};
