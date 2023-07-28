import { Button, FormControl, FormLabel, Input, VStack, NumberInput, NumberInputField, FormErrorMessage } from "@chakra-ui/react";
import { CustomIcon } from "../Shared/CustomIcon";
import { FaArrowRightLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { generateGUID } from "../../helpers";
import { addPlayer, createGame } from "../../helpers/firestoreHelpers";
import { generateBingoPlate } from "../../helpers/bingoPlateHelpers";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { setKey } from "../../store/slices/gameSlice";
import { setUsername } from "../../store/slices/playerSlice";

interface NewGameForm {
    username: string;
    players: number;
}

export const NewGameForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<NewGameForm>({
        defaultValues: {
            username: "",
            players: 2,
        },
    });

    const handleCreateGame = async ({ username, players }: NewGameForm) => {
        const guid = generateGUID();

        await createGame({
            key: guid,
            requiredPlayers: players,
            started: false,
            ended: false,
            pickedNumbers: [],
            currentPlayers: [],
            rowsDone: 0,
            numberModalOpen: false,
            winners: [],
            winnerModalOpen: false,
        });

        await addPlayer({
            key: guid,
            username: username,
            bingoPlate: JSON.stringify(generateBingoPlate()),
            isAdmin: true,
        });

        dispatch(setKey(guid));
        dispatch(setUsername(username));

        navigate("/game");
    };

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
                <FormControl isInvalid={Boolean(errors.players)}>
                    <FormLabel>Antal deltagere</FormLabel>
                    <NumberInput min={2}>
                        <NumberInputField
                            {...register("players", {
                                required: "This field is required",
                                min: { value: 2, message: "Minimum 2 deltagere" },
                            })}
                        />
                    </NumberInput>
                    <FormErrorMessage>{errors?.players?.message}</FormErrorMessage>
                </FormControl>
                <Button width='100%' type='submit' isLoading={isSubmitting} colorScheme='teal' display='flex' gap='10px'>
                    Start nyt spil <CustomIcon icon={FaArrowRightLong} />
                </Button>
            </VStack>
        </form>
    );
};
