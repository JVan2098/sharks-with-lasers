import { TransId } from './generic';

export type BeatEvent =
    | DeadBeatUpdate
    | DamageTakenEvent
    | LaserFiredEvent
    | NarrowScanExecutedEvent
    | ProximityAlarmEvent
    | ScanDetectedEvent
    | SharkDestroyedEvent
    | SharkRespawnedEvent
    | TorpedoDetonatedEvent
    | TorpedoLostEvent
    | WideScanExecutedEvent;

export type DeadBeatUpdate = {
    sharkId: TransId;
    gameTime: number;
    isAlive: 'no';
    respawnAt: number;
    events: BeatEvent[];
};

export type DamageTakenEvent = {
    event: 'damageTakenEvent';
    health: number;
    energy: number;
    source: DamageSource;
};

export type LaserFiredEvent = {
    event: 'laserFiredEvent';
    firingSharkId: TransId;
    commandId: TransId;
    direction: number;
    startingPointX: number;
    startingPointY: number;
    endingPointX: number;
    endingPointY: number;
    sharkHit: BasicShark | null;
};

export type NarrowScanExecutedEvent = {
    event: 'narrowScanExecutedEvent';
    commandId: TransId;
    scanFromX: number;
    scanFromY: number;
    direction: number;
    sharks: ScannedShark[];
    torpedoes: ScannedTorpedo[];
};

export type ProximityAlarmEvent = {
    event: 'proximityAlarmEvent';
};

export type ScanDetectedEvent = {
    event: 'scanDetectedEvent';
    sourcePositionX: number;
    sourcePositionY: number;
};

export type SharkDestroyedEvent = {
    event: 'sharkDestroyedEvent';
    shark: BasicShark;
};

export type SharkRespawnedEvent = {
    event: 'sharkRespawnedEvent';
    shark: BasicShark;
};

export type TorpedoDetonatedEvent = {
    event: 'torpedoDetonatedEvent';
    commandId: TransId;
    firingSharkId: string;
    sharksHit: BasicShark[];
    detonationPointX: number;
    detonationPointY: number;
    pointsScored: number;
};

export type TorpedoLostEvent = {
    event: 'torpedoLostEvent';
    commandId: TransId;
    lastKnownPositionX: number;
    lastKnownPositionY: number;
};

export type WideScanExecutedEvent = {
    event: 'wideScanExecutedEvent';
    commandId: TransId;
    scanningSharkId: TransId;
    centerPointX: number;
    centerPointY: number;
    sharks: ScannedShark[];
    torpedoes: ScannedTorpedo[];
};

export type CommandUpdate = {
    commandId: TransId;
    status: any; // commandStatus, not sure what that is yet
    message: string | null;
};

// Related Entities

type Angle = number; // radians

type BasicShark = {
    id: TransId;
    name: string;
};

type DamageSource = 'laser' | 'torpedo' | 'wall';

type ScannedShark = {
    sharkId: TransId;
    name: string;
    centerX: number;
    centerY: number;
    velocity: Velocity;
    healthStatus: SharkHealthStatus;
};

type ScannedTorpedo = {
    positionX: number;
    positionY: number;
    direction: number;
    message: string;
};

type SharkHealthStatus = 'healthy' | 'crippled' | 'immobilized';

type Velocity = {
    speed: number;
    direction: Angle;
};
