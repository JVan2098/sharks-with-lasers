import { arenaId, playerId } from '../config.ts';
import { socket } from '../index.ts';
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

const moveSharkInBounds = (beatUpdate: BeatUpdate) => {
    socket.emit('setFinSpeed', arenaId, playerId, -5, -5, console.log);
};

const sharkIsNearBorder = (x: number, y: number) => {
    const buffer = 50;
    const dimensions = {
        width: 800,
        height: 600,
    };

    const isCloseToX = dimensions.width - x < buffer;
    const isCloseToY = Math.abs(y - dimensions.height) < buffer;

    return isCloseToX || isCloseToY;
};

const stopShark = () => {
    socket.emit('setFinSpeed', arenaId, playerId, 0, 0, console.log);
};

export const useBoundaryDetection = (beatUpdate: BeatUpdate) => {
    const { positionX, positionY } = beatUpdate;

    if (sharkIsOutOfBounds(positionX, positionY)) {
    }

    if (sharkIsNearBorder(positionX, positionY)) {
        stopShark();
    }
    // while (sharkIsNearBorder(positionX, positionY)) {
    //     // stopShark(socket);
    //     moveSharkInBounds();
    // }
};
