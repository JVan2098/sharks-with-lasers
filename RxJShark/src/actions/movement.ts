import { socket } from '../index.ts';
import { CommandUpdate } from '../types/events.ts';
import { Point } from '../types/generic.ts';
import { getAngleToPoint } from '../utilities/utilities.ts';

export const adjustSharkDirection = (sharkPosition: Point, target: Point) => {
    const angleDifference = getAngleToPoint(sharkPosition, target);
    const newFinSpeeds = calculateFinSpeedToTurn(angleDifference);
};

export const moveSharkForward = (speed: number) => {
    // TODO: Get different speeds based on different situations?
    socket.emit('setFinSpeed', speed, speed, (result: CommandUpdate) =>
        console.log(result)
    );
};

export const calculateFinSpeedToTurn = (angleDifference: number) => {
    const turnRight = angleDifference > 0;
    const maxRadiansPerBeat = 1.1;

    if (Math.abs(angleDifference) >= maxRadiansPerBeat) {
        return turnRight ? { port: 6, starboard: -5 } : { port: -5, starboard: 6 };
    }
};
