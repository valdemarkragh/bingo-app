import { Grid, Text } from "@chakra-ui/react";
import { BingoColumn } from "./BingoColumn";

export const BingoPlate = ({ bingoPlate, isExternalPlate }: { bingoPlate: string; isExternalPlate?: boolean }) => {
    const parsedBingoPlate = JSON.parse(bingoPlate) as (number | null)[][];

    return (
        <>
            {!isExternalPlate ? <Text fontWeight='bold'>Din plade</Text> : null}
            <Grid templateColumns='repeat(9, 1fr)' className={`bingo-plate ${isExternalPlate ? "mini" : ""}`}>
                {parsedBingoPlate.map((col) => (
                    <BingoColumn col={col} key={col.map((num, idx) => num?.toString() + idx.toString()).join("")} />
                ))}
            </Grid>
        </>
    );
};
