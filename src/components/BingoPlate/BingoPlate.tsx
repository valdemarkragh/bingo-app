import { Divider, Grid, Text, VStack } from "@chakra-ui/react";
import { BingoColumn } from "./BingoColumn";
import { useCustomMediaQuery } from "../../hooks/useCustomMediaQuery";

export const BingoPlate = ({ bingoPlate, isExternalPlate }: { bingoPlate: string; isExternalPlate?: boolean }) => {
    const parsedBingoPlate = JSON.parse(bingoPlate) as (number | null)[][];
    const { isMobile } = useCustomMediaQuery();

    return (
        <>
            {!isExternalPlate ? (
                <VStack spacing={2} alignItems='flex-start'>
                    <Text fontWeight='bold' fontSize={isMobile ? "lg" : "2xl"} color='white' textTransform='uppercase'>
                        Din plade
                    </Text>
                    <Divider mb={2} />
                </VStack>
            ) : null}
            <Grid templateColumns='repeat(9, 1fr)' className={`bingo-plate ${isExternalPlate ? "mini" : ""}`}>
                {parsedBingoPlate.map((col) => (
                    <BingoColumn col={col} key={col.map((num, idx) => num?.toString() + idx.toString()).join("")} />
                ))}
            </Grid>
        </>
    );
};
