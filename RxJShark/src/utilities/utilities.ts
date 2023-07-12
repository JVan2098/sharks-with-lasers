import axios from 'axios';
import { arenaId, baseSocket } from '../config.ts';
import { ArenaSettings, Point } from '../types/generic.ts';
import { BeatUpdate } from '../types/updates.ts';
export let arenaSettings: ArenaSettings | undefined = undefined;

// Axios commands
export const axiosGet = <T>(url: string) => axios.get<T>(`${baseSocket}${url}`);

export const axiosPost = (url: string, body: any) =>
    axios.post(`${baseSocket}${url}`, body);

export const axiosPut = (url: string, body: any) =>
    axios.put(`${baseSocket}${url}`, body);

export const getArenaSettings = () =>
    axiosGet<ArenaSettings>(`/arena/${arenaId}/settings`).then(
        (settings) => (arenaSettings = settings.data)
    );

// Other utilities

export const getDistanceToPoint = (source: Point, target: Point) => {
    return Math.sqrt(
        Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2)
    );
};

export function calculateAngleToPoint(source: Point, target: Point): number {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    return normalizeAngle(Math.atan2(dx, dy));
}

function normalizeAngle(theAngle: number): number {
    const fullCircle = Math.PI * 2;
    const normalized = theAngle % fullCircle;
    return normalized < 0 ? normalized + fullCircle : normalized;
}

export function calculateAngleDifference(source: number, target: number) {
    const circle = Math.PI * 2;
    const halfCircle = Math.PI;

    const wSource = workableAngle(source),
        wTarget = workableAngle(target);

    const diff = normalizeAngle(wTarget - wSource);
    if (diff > halfCircle) {
        return diff - circle;
    }
    return diff;

    function workableAngle(angle: number) {
        const modded = angle % circle;
        return modded > halfCircle ? modded - circle : modded;
    }
}

export const getSharkPosition = (beatUpdate: BeatUpdate): Point => {
    return { x: beatUpdate.positionX, y: beatUpdate.positionY };
};

export const sharkIsAlive = (beatUpdate: BeatUpdate) => {
    return beatUpdate.isAlive === 'yes';
};

export const sharkIsMoving = (beatUpdate: BeatUpdate): boolean => {
    return (
        beatUpdate.portFinSpeedActual !== 0 ||
        beatUpdate.starboardFinSpeedActual !== 0
    );
};
