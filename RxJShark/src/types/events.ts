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

type DeadBeatUpdate = {
    sharkId: TransId;
    gameTime: number;
    isAlive: 'no';
    respawnAt: number;
    events: BeatEvent[];
};

type DamageTakenEvent = {
    event: 'damageTakenEvent';
    health: number;
    energy: number;
    source: DamageSource;
};

type LaserFiredEvent = {
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

type NarrowScanExecutedEvent = {
    event: 'narrowScanExecutedEvent';
    commandId: TransId;
    scanFromX: number;
    scanFromY: number;
    direction: number;
    sharks: ScannedShark[];
    torpedoes: ScannedTorpedo[];
};

type ProximityAlarmEvent = {
    event: 'proximityAlarmEvent';
};

type ScanDetectedEvent = {
    event: 'scanDetectedEvent';
    sourcePositionX: number;
    sourcePositionY: number;
};

type SharkDestroyedEvent = {
    event: 'sharkDestroyedEvent';
    shark: BasicShark;
};

type SharkRespawnedEvent = {
    event: 'sharkRespawnedEvent';
    shark: BasicShark;
};

type TorpedoDetonatedEvent = {
    event: 'torpedoDetonatedEvent';
    commandId: TransId;
    firingSharkId: string;
    sharksHit: BasicShark[];
    detonationPointX: number;
    detonationPointY: number;
    pointsScored: number;
};

type TorpedoLostEvent = {
    event: 'torpedoLostEvent';
    commandId: TransId;
    lastKnownPositionX: number;
    lastKnownPositionY: number;
};

type WideScanExecutedEvent = {
    event: 'wideScanExecutedEvent';
    commandId: TransId;
    scanningSharkId: TransId;
    centerPointX: number;
    centerPointY: number;
    sharks: ScannedShark[];
    torpedoes: ScannedTorpedo[];
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
