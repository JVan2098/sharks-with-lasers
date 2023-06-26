import { io } from 'socket.io-client';

export const arenaId = 'VYY-XYY-YYYB';
export const playerId = 'f36ff446-96f8-4c91-bb46-cdc75476d0dd';
export const sharkId = '0000-0008';
export const baseSocket = 'http://192.168.130.142:3000';
export const socket = io(baseSocket);
