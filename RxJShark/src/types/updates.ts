import { BeatEvent } from './events';
import { TransId } from './generic';

export type BeatUpdate = {
    sharkId: TransId;
    gameTime: number;
    isAlive: 'yes';
    mode: 'attack' | 'repair' | 'stealth';
    positionX: number;
    positionY: number;
    facing: number;
    energy: number;
    health: number;
    torpedoCount: number;
    portFinSpeedActual: number;
    starboardFinSpeedActual: number;
    scores: SharkScoreUpdate[];
    events: BeatEvent[];
};

export type SharkScoreUpdate = {
    sharkId: TransId;
    sharkName: string;
    points: number;
    thisLifeKillCount: number;
    killCount: number;
    diedCount: number;
};
