import type { Socket } from 'socket.io-client'
import { DefaultEventsMap } from '../../node_modules/@socket.io/component-emitter'

export type TransId = string

export type MySocket = Socket<DefaultEventsMap, DefaultEventsMap>

export type Point = {
    x: number
    y: number
}
