import { arenaId, playerId, socket } from '../config.ts';
import { FinSpeed, Point } from '../types/generic.ts';
import { BeatUpdate } from '../types/updates.ts';
import {
    calculateAngleDifference,
    calculateAngleToPoint,
    getDistanceToPoint,
    getSharkPosition,
    sharkIsMoving,
} from '../utilities/utilities.ts';

const dimensions = {
    width: 800,
    height: 600,
};
const buffer = 32;
const marginLeft = buffer;
const marginRight = dimensions.width - buffer;
const marginTop = dimensions.height - buffer;
const marginBottom = buffer;
const xMiddle = dimensions.width / 2;
const yMiddle = dimensions.height / 2;

const pathingPoints: { name: string; point: Point }[] = [
    {
        name: 'bottomCenter',
        point: {
            x: xMiddle,
            y: marginBottom,
        },
    },
    {
        name: 'bottomRightCorner',
        point: {
            x: marginRight,
            y: marginBottom,
        },
    },
    {
        name: 'rightCenter',
        point: {
            x: marginRight,
            y: yMiddle,
        },
    },
    {
        name: 'topRightCorner',
        point: {
            x: marginRight,
            y: marginTop,
        },
    },
    {
        name: 'topCenter',
        point: {
            x: xMiddle,
            y: marginTop,
        },
    },
    {
        name: 'topLeftCorner',
        point: {
            x: marginLeft,
            y: marginTop,
        },
    },
    {
        name: 'leftCenter',
        point: {
            x: marginLeft,
            y: yMiddle,
        },
    },
    {
        name: 'bottomLeftCorner',
        point: {
            x: marginLeft,
            y: marginBottom,
        },
    },
];

// let pathPointIndex = 0;
let pathPointIndex = 5;

export const moveAlongPath = (beatUpdate: BeatUpdate) => {
    // if (arenaSettings) {
    //     const settings = arenaSettings;
    // }
    const sharkPosition = getSharkPosition(beatUpdate);
    const currentTarget = pathingPoints[pathPointIndex];

    const maxDistanceInOneBeat = 12;

    const distanceToTarget = getDistanceToPoint(sharkPosition, currentTarget.point);
    const angleToTarget = calculateAngleToPoint(sharkPosition, currentTarget.point);
    const angleDifference = calculateAngleDifference(
        beatUpdate.facing,
        angleToTarget
    );

    if (distanceToTarget < 0.01) {
        if (sharkIsMoving(beatUpdate)) {
            stopShark();
        }
        pathPointIndex =
            pathPointIndex === pathingPoints.length - 1 ? 0 : pathPointIndex + 1;
    } else if (Math.abs(angleDifference) > 0.001) {
        const newFinSpeeds = calculateFinSpeedToTurn(angleDifference);
        turnShark(newFinSpeeds);
        // adjustSharkDirection(sharkPosition, topLeftCorner.point);
    } else if (distanceToTarget >= maxDistanceInOneBeat) {
        if (beatUpdate.portFinSpeedActual !== 6) {
            moveSharkForward(6);
        }
    } else {
        moveSharkForward(distanceToTarget / 2);
    }
};

// export const adjustSharkDirection = (sharkPosition: Point, target: Point) => {
//     const angleDifference = getAngleToPoint(sharkPosition, target);
//     console.log('desired angle', angleDifference);
//     const newFinSpeeds = calculateFinSpeedToTurn(angleDifference);
//     console.log('newFinSpeeds', newFinSpeeds);
//     turnShark(newFinSpeeds);
// };

export const moveSharkForward = (speed: number) => {
    // TODO: Get different speeds based on different situations?
    socket.emit('setFinSpeed', arenaId, playerId, speed, speed, console.log);
};

export const turnShark = ({ port, starboard }: FinSpeed) => {
    socket.emit('setFinSpeed', arenaId, playerId, port, starboard, console.log);
};

export const stopShark = () => {
    socket.emit('setFinSpeed', arenaId, playerId, 0, 0, console.log);
};

export const calculateFinSpeedToTurn = (angleDifference: number) => {
    const turnRight = angleDifference > 0;
    const usefulAngle = Math.abs(angleDifference);
    // const maxRadiansPerBeat = 1.1; 6, -5
    const maxRadiansPerBeat = 1; // 5, -5
    const radianScalingFactor = 10;
    const numberOfSpeeds = 2;

    if (usefulAngle >= maxRadiansPerBeat) {
        return turnRight ? { port: 5, starboard: -5 } : { port: -5, starboard: 5 };
    }

    const newSpeed = (usefulAngle * radianScalingFactor) / numberOfSpeeds;
    return turnRight
        ? { port: newSpeed, starboard: -newSpeed }
        : { port: -newSpeed, starboard: newSpeed };
};
