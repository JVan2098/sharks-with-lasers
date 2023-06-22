type ArenaId = string;
type TransId = string;

export type SharkAwardPoints = {
    sharkId: string;
    points: number;
};

export type ReviveSharks = {
    arenaId: ArenaId;
    sharkIds: TransId[];
};

export type KillSharks = {
    arenaId: ArenaId
    sharkIds: TransId[]
}
