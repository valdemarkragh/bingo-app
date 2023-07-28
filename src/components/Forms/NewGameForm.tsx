import { Button, FormControl, FormLabel, Input, VStack, NumberInput, NumberInputField, FormErrorMessage } from "@chakra-ui/react";
import { CustomIcon } from "../Shared/CustomIcon";
import { FaArrowRightLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useFirestoreContext } from "../../context/firestoreContext";

export interface NewGameForm {
    username: string;
    requiredPlayers: number;
}

export const NewGameForm = () => {
    const { handleCreateGame } = useFirestoreContext();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<NewGameForm>({
        defaultValues: {
            username: "",
            requiredPlayers: 2,
        },
    });

    return (
        <form onSubmit={handleSubmit(handleCreateGame)} style={{ width: "100%" }}>
            <VStack spacing={6} alignItems='start'>
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
                <FormControl isInvalid={Boolean(errors.requiredPlayers)}>
                    <FormLabel>Antal deltagere</FormLabel>
                    <NumberInput min={2}>
                        <NumberInputField
                            {...register("requiredPlayers", {
                                required: "This field is required",
                                min: { value: 2, message: "Minimum 2 deltagere" },
                            })}
                        />
                    </NumberInput>
                    <FormErrorMessage>{errors?.requiredPlayers?.message}</FormErrorMessage>
                </FormControl>
                <Button width='100%' type='submit' isLoading={isSubmitting} colorScheme='teal' display='flex' gap='10px'>
                    Start nyt spil <CustomIcon icon={FaArrowRightLong} />
                </Button>
            </VStack>
        </form>
    );
};
