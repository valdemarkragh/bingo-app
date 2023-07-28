import { BingoNumber } from "./BingoNumber";

export const BingoColumn = ({ col }: { col: (number | null)[] }) => {
    return (
        <div className='bingo-col'>
            {col.map((num, idx) => (
                <BingoNumber num={num} key={num + "" + idx.toString()} />
            ))}
        </div>
    );
};
