import { io } from 'socket.io-client';
import { fromEvent, throttleTime } from 'rxjs';
import { arenaId, playerId, sharkId } from './config.ts';
import { BeatUpdate } from './types/updates.ts';
import { SharkRespawnedEvent } from './types/events.ts';
import { sharkIsAlive } from './actions/assessment.ts';

// TODO: Get WebPack

const baseSocket = 'http://192.168.130.142:3000';
export const socket = io(baseSocket);

const onConnect = fromEvent(socket, 'connect');
onConnect.subscribe(() => {
    socket.emit('takeControl', arenaId, playerId, console.log);
    // socket.emit('setFinSpeed', arenaId, playerId, 6, -5, console.log);
});

const respawn = fromEvent(socket, 'sharkRespawnedEvent');
respawn.subscribe((event: SharkRespawnedEvent) => {
    console.log('respawn', event);
    if (event.shark.id === sharkId) {
        socket.emit('takeControl', arenaId, playerId, console.log);
        // socket.emit('setFinSpeed', arenaId, playerId, 6, 6, console.log);
    }
});

const onUpdate = fromEvent(socket, 'beatUpdate');
const throttledUpdates = onUpdate.pipe(throttleTime(1000));
const extraThrottledUpdates = onUpdate.pipe(throttleTime(10000));

onUpdate.subscribe((beat: BeatUpdate) => {
    if (sharkIsAlive(beat)) {
        console.log(beat);
    } else {
    }
});
