import { BeatUpdate } from '../types/updates';

const sharkIsAlive = (beatUpdate: BeatUpdate) => {
    return beatUpdate.isAlive === 'yes';
};

export const assessTheSituation = (beatUpdate: BeatUpdate) => {
    if (sharkIsAlive(beatUpdate)) {
    }
};
