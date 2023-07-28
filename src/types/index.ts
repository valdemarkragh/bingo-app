export interface IPlayer {
    key: string;
    playerId: string;
    username: string;
    bingoPlate: string;
    isAdmin: boolean;
    kicked: boolean;
}

export interface IPlayerWinner extends IPlayer {
    roundWon: number;
    // row: (number | null)[];
}

export interface IGame {
    key: string;
    requiredPlayers: number;
    started: boolean;
    ended: boolean;
    pickedNumbers: number[];
    currentPlayers: IPlayer[];
    rowsDone: number;
    numberModalOpen: boolean;
    winners: IPlayerWinner[];
    winnerModalOpen: boolean;
}
