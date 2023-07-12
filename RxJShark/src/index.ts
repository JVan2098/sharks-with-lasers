import { fromEvent } from 'rxjs';
import { assessTheSituation } from './actions/assessment.ts';
import { arenaId, playerId, sharkId, socket } from './config.ts';
import {
    DamageTakenEvent,
    DeadBeatUpdate,
    SharkRespawnedEvent,
} from './types/events.ts';
import { BeatUpdate } from './types/updates.ts';

// TODO: Get WebPack

const onConnect = fromEvent(socket, 'connect');
onConnect.subscribe(async () => {
    // await getArenaSettings();
    socket.emit('takeControl', arenaId, playerId, console.log);
});

// const myShark: BasicShark = {
//     id: sharkId,
//     name: 'RxJShark',
// };
// const mySharkRespawned: SharkRespawnedEvent = {
//     event: 'sharkRespawnedEvent',
//     shark: myShark,
// };

// const mySharkDied: SharkDestroyedEvent = {
//     event: 'sharkDestroyedEvent',
//     shark: myShark,
// };

const respawn = fromEvent(socket, 'sharkRespawnedEvent');
respawn.subscribe((event: SharkRespawnedEvent) => {
    console.log('RESPAWN', event);
    if (event.shark.id === sharkId) {
        // socket.emit('takeControl', arenaId, playerId, console.log);
        socket.emit('setSharkMode', arenaId, playerId, 'stealth', console.log);
    }
});

const onUpdate = fromEvent(socket, 'beatUpdate');
onUpdate.subscribe((beat: BeatUpdate) => {
    if (beat.events.length > 0) {
        console.log('events', beat.events);
    }
    if (beat.events.find((event) => event.event === 'sharkRespawnedEvent')) {
        console.log('RESPAWN OH YEAH!!!', beat);
    }
    assessTheSituation(beat);
});

const onDeadUpdate = fromEvent(socket, 'deadbeatUpdate');
onDeadUpdate.subscribe((deadBeat: DeadBeatUpdate) => {
    console.log('deadbeat', deadBeat);
});

const onDamage = fromEvent(socket, 'damageTakenEvent');
onDamage.subscribe((event: DamageTakenEvent) => {
    switch (event.source) {
        case 'laser': {
            return;
        }
        case 'torpedo': {
            return;
        }
        case 'wall': {
            // moveToCenterAsap();
        }
    }
});

// const onUpdatePerTwoSeconds = onUpdate.pipe(throttleTime(2000));
// onUpdatePerTwoSeconds.subscribe((beat: BeatUpdate) => {
//     emitNarrowScan(beat.facing - 1);
// });

// const onUpdatePerFourSeconds = onUpdate.pipe(throttleTime(4000));
// onUpdatePerFourSeconds.subscribe((beat: BeatUpdate) => {
//     fireLaser();
// });
