import { arenaId, playerId, socket } from '../config.ts';
import { BeatUpdate, SharkScoreUpdate } from '../types/updates.ts';
import { sharkIsAlive } from '../utilities/utilities.ts';
import { moveAlongPath } from './movement.ts';

export const keepConnectionAlive = () => {
    socket.emit('takeControl', arenaId, playerId);
};

type SharkStatus = SharkScoreUpdate & { isAlive: boolean };
let sharkMemory: SharkStatus[] = [];

const updateNumberOfSharksInMemory = (scores: SharkScoreUpdate[]) => {
    if (sharkMemory.length !== scores.length) {
        scores.map((score) => {
            if (!sharkMemory.find((shark) => shark.sharkName === score.sharkName)) {
                sharkMemory.push({ ...score, isAlive: true });
            }
        });
    }
};

export const assessTheSituation = (beatUpdate: BeatUpdate) => {
    updateNumberOfSharksInMemory(beatUpdate.scores);

    if (sharkIsAlive(beatUpdate)) {
        moveAlongPath(beatUpdate);
    } else {
        if (beatUpdate.gameTime % 12 === 0) {
            keepConnectionAlive();
        }
    }
};
