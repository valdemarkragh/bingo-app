import { Button, FormControl, FormLabel, Input, VStack, FormErrorMessage } from "@chakra-ui/react";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { addPlayer, getGame } from "../../helpers/firestoreHelpers";
import { useForm } from "react-hook-form";
import { generateBingoPlate } from "../../helpers/bingoPlateHelpers";
import { setKey } from "../../store/slices/gameSlice";
import { setUsername } from "../../store/slices/playerSlice";
import { CustomIcon } from "../Shared/CustomIcon";
import { FaArrowRightLong } from "react-icons/fa6";

interface JoinGameForm {
    username: string;
    key: string;
}

export const JoinGameForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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

    const handleJoinGame = async ({ username, key }: JoinGameForm) => {
        const game = await getGame(key);

        if (!game?.data)
            return setError("key", {
                type: "custom",
                message: "Ugyldig nøgle",
            });

        await addPlayer({
            key,
            username,
            bingoPlate: JSON.stringify(generateBingoPlate()),
            isAdmin: false,
        });

        dispatch(setKey(key));
        dispatch(setUsername(username));

        navigate("/game");
    };
    return (
        <form onSubmit={handleSubmit(handleJoinGame)}>
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
