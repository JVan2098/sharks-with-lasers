import { fromEvent } from 'rxjs';
import { assessTheSituation } from './actions/assessment.ts';
import { arenaId, playerId, socket } from './config.ts';
import { BeatUpdate } from './types/updates.ts';

// TODO: Get WebPack

const onConnect = fromEvent(socket, 'connect');
onConnect.subscribe(async () => {
    // await getArenaSettings();
    socket.emit('takeControl', arenaId, playerId, console.log);
});

// const respawn = fromEvent(socket, 'sharkRespawnedEvent');
// respawn.subscribe((event: SharkRespawnedEvent) => {
//     if (event.shark.id === sharkId) {
//         socket.emit('takeControl', arenaId, playerId, console.log);
//     }
// });

const onUpdate = fromEvent(socket, 'beatUpdate');

onUpdate.subscribe((beat: BeatUpdate) => {
    // console.log(beat);
    assessTheSituation(beat);
});
