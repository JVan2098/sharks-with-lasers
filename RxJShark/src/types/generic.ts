import type { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '../../node_modules/@socket.io/component-emitter';

export type TransId = string;
export type ArenaId = string;

export type MySocket = Socket<DefaultEventsMap, DefaultEventsMap>;

export type Point = {
    x: number;
    y: number;
};

export type FinSpeed = {
    port: number;
    starboard: number;
};

export type ArenaSettings = {
    arenaId: ArenaId;
    type: 'development' | 'private' | 'public' | 'official';
    countdownToStart: number;
    gameLength: number;
    dimensions: {
        width: number;
        height: number;
    };
    spectatorDelay: number;
    trashTalk: {
        responseTime: number;
        maxMessageLength: number;
    };
    shark: {
        goldKillCount: number;
        fins: {
            minSpeed: number;
            maxSpeed: number;
            crippledSpeedReduction: number;
            immobilizedSpeedReduction: number;
        };
        dimensions: {
            width: number;
            height: number;
        };
        health: {
            starting: number;
            max: number;
        };
        energy: {
            starting: number;
            max: number;
        };
    };
    torpedo: {
        startingCount: number;
        maxCount: number;
        regenFrequency: number;
        speed: number;
        explosionRange: number;
        explosionToll: HealthAndEngergyChange;
    };
    laser: {
        firingToll: HealthAndEngergyChange;
        hitToll: HealthAndEngergyChange;
    };
    scan: {
        proximityAlarmRange: number; // distance
        wideRange: number; // distance
        wideToll: HealthAndEngergyChange;
        narrowBand: number; // angle
        narrowScanToll: HealthAndEngergyChange;
    };
    outOfBoundsToll: HealthAndEngergyChange;
    deathTimePenalty: {
        // base * previousNumberOfDeaths^perAdditionalMultiplier
        base: number;
        perAdditionalMultiplier: number;
        max: number;
    };
    modeBeatToll: {
        attackMode: HealthAndEngergyChange;
        repairMode: HealthAndEngergyChange;
        stealthMode: HealthAndEngergyChange;
    };
    scoring: {
        perLivingBeat: number;
        perHealthDamageInflicted: number;
        bounty: {
            // base * numberOfUnansweredKills^perAdditionalMultiplier
            base: number;
            perAdditionalMultiplier: number;
            max: number;
        };
    };
};

type HealthAndEngergyChange = {
    health: number;
    energy: number;
};
