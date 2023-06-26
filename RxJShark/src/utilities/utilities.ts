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

// export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

// export const getAngleToTarget = (source: Point, target: Point) => {
//     const trueNorthSharkVector = {
//         pointOne: { x: source.x, y: source.y },
//         pointTwo: { x: source.x, y: source.y + 100 },
//     };
//     const vectorToPoint = {
//         pointOne: { x: source.x, y: source.y },
//         pointTwo: { x: target.x, y: target.y },
//     };

//     const vOneDeltaX =
//         trueNorthSharkVector.pointTwo.x - trueNorthSharkVector.pointOne.x;
//     const vTwoDeltaX = vectorToPoint.pointTwo.x - vectorToPoint.pointOne.x;
//     const vOneDeltaY =
//         trueNorthSharkVector.pointTwo.y - trueNorthSharkVector.pointOne.y;
//     const vTwoDeltaY = vectorToPoint.pointTwo.y - vectorToPoint.pointOne.y;

//     const divisor = vOneDeltaX * vTwoDeltaX + vOneDeltaY * vTwoDeltaY;
//     const dividend =
//         Math.sqrt(Math.pow(vOneDeltaX, 2) + Math.pow(vOneDeltaY, 2)) *
//         Math.sqrt(Math.pow(vTwoDeltaX, 2) + Math.pow(vTwoDeltaY, 2));
//     const angle = Math.acos(divisor / dividend);

//     return angle;

//     // return target.x - source.x >= 0 ? angle : -angle;
// };

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

export const sharkIsMoving = (beatUpdate: BeatUpdate): boolean => {
    return (
        beatUpdate.portFinSpeedActual !== 0 ||
        beatUpdate.starboardFinSpeedActual !== 0
    );
};
