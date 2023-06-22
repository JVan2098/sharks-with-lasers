import { useState } from 'react';
import { fireLaser, fireTorpedo } from '../../helpers/actions';

export const Attack = () => {
    const [torpedoAngle, setTorpedoAngle] = useState(0);

    return (
        <div className="field has-background-danger-light p-2">
            <label className="label">Attack</label>
            <div className="control">
                <div className="columns">
                    <div className="column">
                        <button className="button is-warning is-fullwidth" onClick={() => fireLaser()}>Fire Laser</button>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <input className="input is-fullwidth" type="number" placeholder="Direction (radians)" onChange={(event) => setTorpedoAngle(+event.target.value)} />
                    </div>
                    <div className="column">
                        <button className="button is-danger is-fullwidth" onClick={() => fireTorpedo(torpedoAngle)}>Fire Torpedo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}