import axios from 'axios';
import { arenaId, baseSocket, playerId, sharkId, socket } from '../utilities/config';
import { KillSharks, ReviveSharks } from './types';

// Shark commands
export const takeControl = () => socket.emit('takeControl', arenaId, playerId);

export const moveShark = (port: number, starboard: number) =>
    socket.emit('setFinSpeed', arenaId, playerId, port, starboard, console.log);

export const stopShark = () => moveShark(0, 0);

export const fireLaser = () => socket.emit('fireLaser', arenaId, playerId);

export const fireTorpedo = (angle: number) =>
    socket.emit('fireTorpedo', arenaId, playerId, angle, console.log);

// Axios commands
export const axiosPost = (url: string, body: any) =>
    axios.post(`${baseSocket}${url}`, body);

export const axiosPut = (url: string, body: any) =>
    axios.put(`${baseSocket}${url}`, body);

export const tweakArena = () =>
    axios.put(`${baseSocket}development/tweak`, arenaTweak);



// Command bodies
export const arenaTweak = {
    arenaId: `${arenaId}`,
    maxDeathTimePenalty: 12,
    torpedoRegenFrequency: 1,
    laserEnergyToll: 0,
    laserHitHealthToll: -1,
    maxEnergy: 100,
    maxHealth: 2000,
    pointsPerLivingBeat: 1,
};

export const sharkRevival: ReviveSharks = {
    arenaId,
    sharkIds: [sharkId],
};

export const sharkMassacre: KillSharks = {
    arenaId,
    sharkIds: [sharkId],
}
