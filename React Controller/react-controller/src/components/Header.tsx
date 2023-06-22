import { takeControl } from '../helpers/actions'

export const Header = () => {
    return <div className="columns">
        <div className="column">
            <h1 className="title">
                Bacon Control
            </h1>
        </div>
        <div className="column">
            <h2 className="subtitle is-pulled-right">
                <button className="button is-primary" onClick={takeControl}>Take Control</button>
            </h2>
        </div>
    </div>
}