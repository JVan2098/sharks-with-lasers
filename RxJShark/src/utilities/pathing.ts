import { arenaId } from '../config.ts';
import { Point } from '../types/generic.ts';
import { axiosPost } from './utilities.ts';

export const placePathMarker = (point: Point) => {
    const url = `/development/marker`;
    const body = {
        arenaId: `${arenaId}`,
        lifeSpan: 50,
        x: point.x,
        y: point.y,
    };
    axiosPost(url, body);
};
