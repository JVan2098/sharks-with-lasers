import { arenaId, playerId, socket } from '../config.ts';
import { FinSpeed, Point } from '../types/generic.ts';
import { BeatUpdate } from '../types/updates.ts';
import {
    maxDistanceInOneBeat,
    maxRadiansTurnedPerBeat,
} from '../utilities/constants.ts';
import {
    PointAlpha,
    PointBeta,
    PointDelta,
    PointEpsilon,
    PointEta,
    PointGamma,
    PointIota,
    PointKappa,
    PointLambda,
    PointMu,
    PointNu,
    PointOmicron,
    PointPi,
    PointRho,
    PointSigma,
    PointTau,
    PointTheta,
    PointUpsilon,
    PointXi,
    PointZeta,
    bottomCenter,
    bottomLeftCorner,
    bottomRightCorner,
    center,
    leftCenter,
    rightCenter,
    topLeftCorner,
    topRightCorner,
    verifyTargetLocation,
} from '../utilities/locations.ts';
import { placePathMarker } from '../utilities/pathing.ts';
import {
    calculateAngleDifference,
    calculateAngleToPoint,
    getDistanceToPoint,
    getSharkPosition,
    sharkIsMoving,
} from '../utilities/utilities.ts';

const pathingPoints: Point[] = [
    bottomCenter,
    bottomRightCorner,
    topLeftCorner,
    topRightCorner,
    center,
    rightCenter,
    bottomCenter,
    leftCenter,
    bottomLeftCorner,
];

const attackPathingPoints: Point[] = [
    PointAlpha,
    PointBeta,
    PointGamma,
    PointDelta,
    PointEpsilon,
    PointZeta,
    PointEta,
    PointTheta,
    PointIota,
    PointKappa,
    PointLambda,
    PointMu,
    PointNu,
    PointXi,
    PointOmicron,
    PointPi,
    PointRho,
    PointSigma,
    PointTau,
    PointUpsilon,
];

let pathPointIndex = 0;

const currentPath = attackPathingPoints;

export const moveAlongPath = (beatUpdate: BeatUpdate) => {
    const sharkPosition = getSharkPosition(beatUpdate);
    const currentTarget = currentPath[pathPointIndex];
    const verifiedTarget = verifyTargetLocation(currentTarget);

    if (beatUpdate.gameTime % 12 === 0) {
        placePathMarker(verifiedTarget);
    }

    const distanceToTarget = getDistanceToPoint(sharkPosition, verifiedTarget);
    const angleToTarget = calculateAngleToPoint(sharkPosition, verifiedTarget);
    const angleDifference = calculateAngleDifference(
        beatUpdate.facing,
        angleToTarget
    );

    if (distanceToTarget < 0.001) {
        if (sharkIsMoving(beatUpdate)) {
            stopShark();
        }
        pathPointIndex =
            pathPointIndex === currentPath.length - 1 ? 0 : pathPointIndex + 1;
    } else if (Math.abs(angleDifference) > 0.001) {
        const newFinSpeeds = calculateFinSpeedToTurn(angleDifference);
        turnShark(newFinSpeeds);
    } else if (distanceToTarget >= maxDistanceInOneBeat) {
        if (beatUpdate.portFinSpeedActual !== 6) {
            moveSharkForward(6);
        }
    } else {
        moveSharkForward(distanceToTarget / 2);
    }
};

export const moveTowardTarget = (target: Point) => (beatUpdate: BeatUpdate) => {
    const sharkPosition = getSharkPosition(beatUpdate);
    const verifiedTarget = verifyTargetLocation(target);

    const distanceToTarget = getDistanceToPoint(sharkPosition, verifiedTarget);
    const angleToTarget = calculateAngleToPoint(sharkPosition, verifiedTarget);
    const angleDifference = calculateAngleDifference(
        beatUpdate.facing,
        angleToTarget
    );

    if (distanceToTarget < 0.001) {
        if (sharkIsMoving(beatUpdate)) {
            stopShark();
        }
    } else if (Math.abs(angleDifference) > 0.001) {
        const newFinSpeeds = calculateFinSpeedToTurn(angleDifference);
        if (
            beatUpdate.portFinSpeedActual !== newFinSpeeds.port ||
            beatUpdate.starboardFinSpeedActual !== newFinSpeeds.starboard
        ) {
            turnShark(newFinSpeeds);
        }
    } else if (distanceToTarget >= maxDistanceInOneBeat) {
        if (beatUpdate.portFinSpeedActual !== 6) {
            moveSharkForward(6);
        }
    } else {
        moveSharkForward(distanceToTarget / 2);
    }
};

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

    const radianScalingFactor = 10;
    const numberOfSpeeds = 2;

    if (usefulAngle >= maxRadiansTurnedPerBeat) {
        return turnRight ? { port: 5, starboard: -5 } : { port: -5, starboard: 5 };
    }

    const newSpeed = (usefulAngle * radianScalingFactor) / numberOfSpeeds;
    return turnRight
        ? { port: newSpeed, starboard: -newSpeed }
        : { port: -newSpeed, starboard: newSpeed };
};
