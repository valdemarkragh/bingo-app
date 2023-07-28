import { Button, FormControl, FormLabel, Input, VStack, FormErrorMessage } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CustomIcon } from "../Shared/CustomIcon";
import { FaArrowRightLong } from "react-icons/fa6";
import { useFirestoreContext } from "../../context/firestoreContext";

export interface JoinGameForm {
    username: string;
    key: string;
}

export const JoinGameForm = () => {
    const { handleJoinGame } = useFirestoreContext();

    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<JoinGameForm>({
        defaultValues: {
            username: "",
            key: "",
        },
    });

    const joinGame = async (data: JoinGameForm) => {
        const success = await handleJoinGame(data);

        if (!success) {
            return setError("key", {
                type: "custom",
                message: "Ugyldig nøgle",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(joinGame)}>
            <VStack spacing={6}>
                <FormControl isInvalid={Boolean(errors.username)}>
                    <FormLabel>Brugernavn</FormLabel>
                    <Input
                        type='text'
                        {...register("username", {
                            required: "Brugernavn er påkrævet",
                            minLength: { value: 5, message: "Brugernavn skal være minimum 5 karakterer" },
                        })}
                    />
                    <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.key)}>
                    <FormLabel>Nøgle</FormLabel>
                    <Input
                        type='text'
                        {...register("key", {
                            required: "Nøgle er påkrævet",
                        })}
                    />
                    <FormErrorMessage>{errors?.key?.message}</FormErrorMessage>
                </FormControl>
                <Button width='100%' isLoading={isSubmitting} colorScheme='teal' type='submit' display='flex' gap='10px'>
                    Tilslut spil <CustomIcon icon={FaArrowRightLong} />
                </Button>
            </VStack>
        </form>
    );
};
