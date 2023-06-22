import { Header } from './Header';
import { ControlPanel } from './ControlPanel/ControlPanel';

export const Controller = () => {

    return (
        <section className="hero is-large is-info">
            <div className="hero-body">
                <Header />
                <ControlPanel />
            </div>
        </section>
    );
};