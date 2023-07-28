import { Box, Container, TabPanel, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { NewGameForm } from "../components/Forms/NewGameForm";
import { JoinGameForm } from "../components/Forms/JoinGameForm";

export const Home = () => {
    return (
        <Container height='100%' alignItems='center' maxW='xl' display='flex' justifyContent='center'>
            <Box borderRadius={10} backgroundColor='white' width='100%' border='1px solid teal'>
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
