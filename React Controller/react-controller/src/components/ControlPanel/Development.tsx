import { axiosPost, axiosPut, sharkMassacre, sharkRevival, tweakArena } from '../../helpers/actions';

const reviveShark = () => axiosPut('development/sharks/revive', sharkRevival);
const killShark = () => axiosPost('development/sharks/make-dead', sharkMassacre);

export const Development = () => {
    return (
        <div className="field has-background-info-light p-2">
            <label className="label">Development</label>
            <div className="control">
                <div className="column">
                    <button className="button is-success is-fullwidth" onClick={reviveShark}>Revive Shark</button>
                </div>
                <div className="column">
                    <button className="button is-success is-fullwidth" onClick={killShark}>Kill Shark</button>
                </div>
                <div className="column">
                    <button className="button is-success is-fullwidth" onClick={tweakArena}>Tweak Arena</button>
                </div>
            </div>
        </div>
    );
};