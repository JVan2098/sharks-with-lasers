import { arenaId, playerId, socket } from '../config.ts';

export const fireLaser = () => {
    socket.emit('fireLaser', arenaId, playerId, console.log);
};
