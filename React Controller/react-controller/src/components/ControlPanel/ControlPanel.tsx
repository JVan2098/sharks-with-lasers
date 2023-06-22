import { Attack } from './Attack';
import { Development } from './Development';
import { MoveShark } from './MoveShark';

export const ControlPanel = () => {

    return (
        <>
            <div className="columns">
                <div className="column has-text-black" style={{ backgroundColor: 'white' }}>
                    <MoveShark />
                </div>
                <div className="column has-text-black" style={{ backgroundColor: 'white' }}>
                    <Attack />
                </div>
            </div>
            <div className="columns">
                <div className="column has-text-black is-half" style={{ backgroundColor: 'white' }}>
                    <Development />
                </div>
                <div className="column has-text-black is-half" style={{ backgroundColor: 'white' }}>
                </div>
            </div>
        </>
    );
}