import { Container, Spinner } from "@chakra-ui/react";

export const Loader = () => {
    return (
        <Container height='100%' alignItems='center' maxW='lg' display='flex' justifyContent='center'>
            <Spinner thickness='4px' speed='1.3s' emptyColor='gray.200' color='teal.500' size='lg' />
        </Container>
    );
};
