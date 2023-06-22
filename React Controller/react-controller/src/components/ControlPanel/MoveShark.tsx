import { useState } from 'react';
import { moveShark, stopShark } from '../../helpers/actions';

export const MoveShark = () => {
    const [port, setPort] = useState(0);
    const [starboard, setStarboard] = useState(0);
    const [speed, setForward] = useState(0);

    return (
        <div className="field has-background-primary-light p-2">
            <label className="label">Move Shark</label>
            <div className="control">
                <div className="columns">
                    <div className="column">
                        <button className="button is-danger is-fullwidth" onClick={stopShark}>Stop Shark</button>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-one-third">
                        <button className="button is-dark is-fullwidth" onClick={() => moveShark(-speed, -speed)}>Move Backward</button>
                    </div>
                    <div className="column is-one-third">
                        <input className="input is-fullwidth" type="number" placeholder="Speed" onChange={(event) => setForward(+event.target.value)} />
                    </div>
                    <div className="column is-one-third">
                        <button className="button is-dark is-fullwidth" onClick={() => moveShark(speed, speed)}>Move Forward</button>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <input className="input is-fullwidth" type="number" placeholder="Port" onChange={(event) => setPort(+event.target.value)} />
                    </div>
                    <div className="column">
                        <input className="input is-fullwidth" type="number" placeholder="Starboard" onChange={(event) => setStarboard(+event.target.value)} />
                    </div>
                    <div className="column">
                        <button className="button is-dark is-fullwidth" onClick={() => moveShark(port, starboard)}>Move Shark</button>
                    </div>
                </div>
            </div>
        </div >
    );
};