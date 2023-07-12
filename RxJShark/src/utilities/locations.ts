import { Point } from '../types/generic';

const dimensions = {
    width: 800,
    height: 600,
};
const buffer = 32;
const marginLeft = buffer;
const marginRight = dimensions.width - buffer;
const marginTop = dimensions.height - buffer;
const marginBottom = buffer;
const xMiddle = dimensions.width / 2;
const yMiddle = dimensions.height / 2;

export const outOfBoundsLeft: Point = {
    x: -marginLeft,
    y: yMiddle,
};

export const outOfBoundsTop: Point = {
    x: xMiddle,
    y: dimensions.height + marginTop,
};

export const outOfBoundsRight: Point = {
    x: dimensions.width + marginRight,
    y: yMiddle,
};

export const outOfBoundsBottom: Point = {
    x: xMiddle,
    y: -marginBottom,
};

export const bottomCenter: Point = {
    x: xMiddle,
    y: marginBottom,
};

export const bottomRightCorner: Point = {
    x: marginRight,
    y: marginBottom,
};

export const center: Point = {
    x: xMiddle,
    y: yMiddle,
};

export const rightCenter: Point = {
    x: marginRight,
    y: yMiddle,
};

export const topRightCorner: Point = {
    x: marginRight,
    y: marginTop,
};

export const topCenter: Point = {
    x: xMiddle,
    y: marginTop,
};

export const topLeftCorner: Point = {
    x: marginLeft,
    y: marginTop,
};

export const leftCenter: Point = {
    x: marginLeft,
    y: yMiddle,
};

export const bottomLeftCorner: Point = {
    x: marginLeft,
    y: marginBottom,
};

export const isOutOfLeftBound = (point: Point) => {
    return point.x < 0;
};

export const isOutOfRightBound = (point: Point) => {
    return point.x > dimensions.width;
};

export const isOutOfTopBound = (point: Point) => {
    return point.y < 0;
};

export const isOutOfBottomBound = (point: Point) => {
    return point.y > dimensions.height;
};

export const verifyTargetLocation = (target: Point) => {
    const boundBuffer = 10;
    let verifiedTarget: Point = {
        x: target.x,
        y: target.y,
    };

    if (isOutOfLeftBound(target)) {
        verifiedTarget.x = boundBuffer;
    }
    if (isOutOfRightBound(target)) {
        verifiedTarget.x = dimensions.width - boundBuffer;
    }
    if (isOutOfTopBound(target)) {
        verifiedTarget.y = boundBuffer;
    }
    if (isOutOfBottomBound(target)) {
        verifiedTarget.y = dimensions.height - boundBuffer;
    }

    return verifiedTarget;
};

// Attack path points

// Straight bottom
export const PointAlpha: Point = {
    x: 400,
    y: 100,
};
export const PointBeta: Point = {
    x: 500,
    y: 100,
};
export const PointGamma: Point = {
    x: 600,
    y: 100,
};
// Right curve up
export const PointDelta: Point = {
    x: 675,
    y: 150,
};
export const PointEpsilon: Point = {
    x: 725,
    y: 220,
};
export const PointZeta: Point = {
    x: 725,
    y: 300,
};
// Right curve top
export const PointEta: Point = {
    x: 725,
    y: 380,
};
export const PointTheta: Point = {
    x: 675,
    y: 450,
};
// Straight top
export const PointIota: Point = {
    x: 600,
    y: 500,
};
export const PointKappa: Point = {
    x: 500,
    y: 500,
};
export const PointLambda: Point = {
    x: 400,
    y: 500,
};
export const PointMu: Point = {
    x: 300,
    y: 500,
};
export const PointNu: Point = {
    x: 200,
    y: 500,
};
// Left curve down
export const PointXi: Point = {
    x: 125,
    y: 450,
};
export const PointOmicron: Point = {
    x: 75,
    y: 380,
};
export const PointPi: Point = {
    x: 75,
    y: 300,
};
// Left curve bottom
export const PointRho: Point = {
    x: 75,
    y: 220,
};
export const PointSigma: Point = {
    x: 125,
    y: 150,
};
export const PointTau: Point = {
    x: 200,
    y: 100,
};
export const PointUpsilon: Point = {
    x: 300,
    y: 100,
};
