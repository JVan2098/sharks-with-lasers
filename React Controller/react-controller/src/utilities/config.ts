import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export const baseSocket = 'http://192.168.130.142:3000/';
export const arenaId = 'JYY-WYY-YYYK';
export const playerId = '4e7db76c-81ff-4226-a0c6-ed1fba8e6090';
export const sharkId = '0000-000B';

export const socket = io(baseSocket);

export type MySocket = Socket<DefaultEventsMap, DefaultEventsMap>;
