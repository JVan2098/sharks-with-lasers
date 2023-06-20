import { io } from 'socket.io-client';
import { fromEvent, throttleTime } from 'rxjs';
import { arenaId, playerId } from './config.ts';
import { BeatUpdate } from './types/updates.ts';

const baseSocket = 'http://192.168.130.142:3000';
const socket = io(baseSocket);

const onConnect = fromEvent(socket, 'connect');
onConnect.subscribe((beat: BeatUpdate) => {
    // socket.emit('takeControl', arenaId, playerId, console.log);
    socket.emit('setFinSpeed', arenaId, playerId, 5, 6, console.log);
});

const onUpdate = fromEvent(socket, 'beatUpdate');

const throttledUpdates = onUpdate.pipe(throttleTime(1000));
const extraThrottledUpdates = onUpdate.pipe(throttleTime(3000));

extraThrottledUpdates.subscribe((beat: any) => {
    socket.emit('fireLaser', arenaId, playerId);
});
