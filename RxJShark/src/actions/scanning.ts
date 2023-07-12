import { arenaId, playerId, socket } from '../config.ts';

export const emitNarrowScan = (angle: number) => {
    socket.emit('performNarrowScan', arenaId, playerId, angle, console.log);
};
