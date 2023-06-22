import { fromEvent, throttleTime } from 'rxjs';
import { socket } from '../index';

export const sharkRespawn = fromEvent(socket, 'sharkRespawnedEvent');

export const onUpdate = fromEvent(socket, 'beatUpdate');

export const oneSecondDelay = onUpdate.pipe(throttleTime(1000));
