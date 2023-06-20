import { arenaId, playerId } from '../config';
import { MySocket } from '../types/generic';
import { BeatUpdate } from '../types/updates';

const sharkIsOutOfBounds = (x: number, y: number) => {
    const base = 0;
    const dimensions = {
        width: 800,
        height: 600,
    };

    const xIsOutOfBounds = x < base || x > dimensions.width;
    const yIsOutOfBounds = y < base || y > dimensions.height;

    return xIsOutOfBounds || yIsOutOfBounds;
};

const moveSharkInBounds = (socket: MySocket) => {
    socket.emit('setFinSpeed', arenaId, playerId, -5, -5);
};

const useBoundaryDetection = (socket: MySocket) => (beatUpdate: BeatUpdate) => {
    const { positionX: sharkX, positionY: sharkY } = beatUpdate;

    while (sharkIsOutOfBounds(sharkX, sharkY)) {
        moveSharkInBounds(socket);
    }
};
