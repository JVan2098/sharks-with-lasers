import { socket } from '../index';
import { arenaId, playerId } from '../config';
import { BeatUpdate } from '../types/updates';

export const sharkIsAlive = (beatUpdate: BeatUpdate) => {
    return beatUpdate.isAlive === 'yes';
};

export const keepConnectionAlive = () => {
    socket.emit('takeControl', arenaId, playerId);
};

export const assessTheSituation = (beatUpdate: BeatUpdate) => {
    if (sharkIsAlive(beatUpdate)) {
    } else {
        if (beatUpdate.gameTime % 12 === 0) {
            keepConnectionAlive();
        }
    }
};
