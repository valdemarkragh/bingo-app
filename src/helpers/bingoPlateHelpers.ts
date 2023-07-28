export function generateBingoPlate() {
    const poss: [number, number][] = [];
    const yxs: { [key: number]: number[] } = {};

    for (let y = 0; y < 3; y++) {
        yxs[y] = [];
    }

    for (let x = 0; x < 9; x++) {
        const ys: number[] = [];

        for (let i = 0; i < 3; i++) {
            if (yxs[i].length < 5) {
                ys.push(i);
            }
        }

        ys.sort(() => Math.random() - 0.5);
        const y = ys[0];
        poss.push([x, y]);
        yxs[y].push(x);
    }

    for (let y = 0; y < 3; y++) {
        const xs = [...Array(9).keys()];
        const ts = yxs[y];

        for (const t of ts) {
            const index = xs.indexOf(t);
            if (index !== -1) {
                xs.splice(index, 1);
            }
        }

        xs.sort(() => Math.random() - 0.5);
        const sliceLength = 5 - ts.length;
        const selectedXs = xs.slice(0, sliceLength);

        for (const x of selectedXs) {
            poss.push([x, y]);
        }
    }

    const banko: (number | null | boolean)[][] = Array.from({ length: 9 }, () => Array(3).fill(null));
    const xs = [...Array(9).keys()];
    xs.sort(() => Math.random() - 0.5);

    for (const x of xs) {
        const col: (number | null | boolean)[] = [];
        banko[x] = col;
        let nns = 0;

        for (let y = 0; y < 3; y++) {
            if (poss.some(([px, py]) => px === x && py === y)) {
                col.push(true);
                nns += 1;
            } else {
                col.push(null);
            }
        }

        const ns = [...Array(9).keys()].map((n) => n + 1); // Numbers start from 1 instead of 0
        ns.sort(() => Math.random() - 0.5);
        const selectedNs = ns.slice(0, nns);
        selectedNs.sort((a, b) => a - b);

        let j = 0;
        for (let i = 0; i < 3; i++) {
            if (col[i]) {
                col[i] = selectedNs[j] + 10 * x;
                j += 1;
            }
        }
    }

    return banko as (number | null)[][];
}

export function generateRandomNumber(alreadyPickedNumbers: number[]): number {
    const maxNumber = 90;
    let randomNumber: number;

    do {
        randomNumber = Math.floor(Math.random() * (maxNumber + 1));
    } while (alreadyPickedNumbers.includes(randomNumber));

    return randomNumber;
}

export function getRowNumbers(arr: (number | null)[][], rowNumber: number) {
    const rowNumbers: (number | null)[] = [];

    for (const column of arr) {
        if (column.length >= rowNumber) {
            rowNumbers.push(column[rowNumber - 1]);
        } else {
            rowNumbers.push(null);
        }
    }

    return rowNumbers;
}

export const isRowCompleted = (pickedNumbers: number[], bingoPlate: (number | null)[][], rowNum: number) => {
    return (
        getRowNumbers(bingoPlate, rowNum)
            .filter((row) => row !== null)
            .map((row) => row) as number[]
    ).every((num) => pickedNumbers.includes(num));
};

export const parseBingoPlate = (bingoPlate: string) => {
    return JSON.parse(bingoPlate) as (number | null)[][];
};
