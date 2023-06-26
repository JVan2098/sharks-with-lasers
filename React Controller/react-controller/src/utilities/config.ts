import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export const baseSocket = 'http://192.168.130.142:3000/';
export const arenaId = 'FYY-YYY-YYY4';
export const playerId = '6bf8ef87-5ab8-427b-a615-bb384e6a8301';
export const sharkId = '0000-0003';

export const socket = io(baseSocket);

export type MySocket = Socket<DefaultEventsMap, DefaultEventsMap>;
