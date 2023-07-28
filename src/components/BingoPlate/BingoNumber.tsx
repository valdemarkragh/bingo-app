import { useAppSelector } from "../../store/hooks";

export const BingoNumber = ({ num }: { num: number | null }) => {
    const { gameMetaData } = useAppSelector((state) => state.game);

    return <div className={`bingo-num ${num && gameMetaData?.pickedNumbers.includes(num) ? "picked" : ""}`}>{num ?? ""}</div>;
};
