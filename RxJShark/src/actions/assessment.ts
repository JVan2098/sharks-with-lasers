import { arenaId, playerId, socket } from '../config.ts';
import { BeatUpdate } from '../types/updates.ts';
import { moveAlongPath } from './movement.ts';

export const sharkIsAlive = (beatUpdate: BeatUpdate) => {
    return beatUpdate.isAlive === 'yes';
};

export const keepConnectionAlive = () => {
    socket.emit('takeControl', arenaId, playerId);
};

export const assessTheSituation = (beatUpdate: BeatUpdate) => {
    if (sharkIsAlive(beatUpdate)) {
        moveAlongPath(beatUpdate);
    } else {
        if (beatUpdate.gameTime % 12 === 0) {
            keepConnectionAlive();
        }
    }
};
