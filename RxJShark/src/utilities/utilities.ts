import { Point } from '../types/generic.ts';

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

// export const getBearingToCenter = (
//     sharkX: number,
//     sharkY: number,
//     centerX: number,
//     centerY: number
// ) => {
//     const X = Math.sin(centerY - sharkY) * Math.cos(centerY)
//     const Y =
//         Math.cos(sharkX) * Math.sin(centerX) -
//         Math.sin(sharkX) * Math.cos(centerX) * Math.cos(centerY - sharkY)

//     // const;
//     return Math.atan2(X, Y)
// }

// export const goToPoint = (source: Point, target: Point) => {
//     // TODO: Calculate number of beats it will take to reach target
//     const angleToPoint = getAngleToPoint(source, target)
// }

export const getAngleToPoint = (source: Point, target: Point) => {
    return Math.atan2(target.y - source.y, target.x - source.x);
};

// export const getShortestCourseCorrection = (angleInRads: number) => {
//     const turnMoreThanHalfATurn = angleInRads > Math.PI
//     const differenceFromFullCircle = 2 * Math.PI - angleInRads

//     return turnMoreThanHalfATurn ? differenceFromFullCircle : angleInRads
// }
