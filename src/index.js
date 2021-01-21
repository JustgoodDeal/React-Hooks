import React, {Component, useCallback, useEffect, useMemo, useState} from "react";
import ReactDOM from "react-dom";


const App = () => {
    const [ value, setValue ] = useState(1);
    const [ visible, setVisible ] = useState(true);

    if (visible) {
        return (
            <div>
                <button
                    onClick={() => setValue((v) => v + 1)}>
                    +
                </button>
                <button
                    onClick={() => setVisible(false)}>
                    hide
                </button>
                <ClassCounter value={value} />
                <HookCounter value={value} />
                <Notification />
                <PlanetInfoOne id={value} />
                <PlanetInfoTwo id={value} />
            </div>
        )
    }
    return (
        <button
            onClick={() => setVisible(true)}>
            show
        </button>
    )
};


const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}/`)
        .then(res => res.json())
        .then(planet => planet);
};

const useRequestHook = (request) => {

    const initialState = useMemo(() => {
        return {
            planet: null,
            loading: true,
            error: null,
        }
    }, []);

    const [ planetState, setPlanetState ] = useState(initialState);

    useEffect(() => {
        setPlanetState(initialState);
        let cancelled = false;
        request()
            .then(planet => !cancelled && setPlanetState({
                planet,
                loading: false,
                error: null,
            }))
            .catch((error) => !cancelled && setPlanetState({
                data: null,
                loading: false,
                error
            }));
        return () => cancelled = true;
    }, [ request, initialState ]);

    return planetState
};

const usePlanetTwoHook = (id) => {
    const request = useCallback(() => getPlanet(id), [ id ]);
    return useRequestHook(request)
};

const PlanetInfoTwo = ({id}) => {
    const { planet, loading, error } = usePlanetTwoHook(id);

    if (error) {
        return <div> Error </div>
    }
    if (loading) {
        return <div> Loading ... </div>
    }
    return <div> {id} - Planet {planet.name} </div>
};



const usePlanetOneHook = (id) => {
    const [ planetName, setPlanetName ] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch(`https://swapi.dev/api/planets/${id}/`)
            .then(res => res.json())
            .then(planet => !cancelled && setPlanetName(planet.name));
        return () => cancelled = true;
    }, [id]);

    return planetName
};

const PlanetInfoOne = ({id}) => {

    const planetName = usePlanetOneHook(id);
    return <div> {id} - Planet {planetName} </div>
};



const Notification = () => {

    const [ visible, setVisible ] = useState(true);

    useEffect(() => {
        const timerId = setTimeout(() => setVisible(false), 2500);
        return () => clearTimeout(timerId)
    }, []);

    if (visible) {
        return (
            <div>
                <p> Notify </p>
            </div>
        )
    }
    return <div> </div>

};



const HookCounter = ({value}) => {

    useEffect(() => {
        console.log('useEffect DidMount');
    }, []);

    useEffect(() => {
        console.log('useEffect DidMount and DidUpdate');
    });

    useEffect(() => {
        console.log('useEffect DidMount - сработаю 1 раз (когда компонент создается)');
        return () => console.log('useEffect WillUnmount - сработаю 1 раз (когда компонент уничтожается)')
    }, []);

    useEffect(() => {
        console.log('useEffect DidMount and DidUpdate');
        return () => console.log('useEffect Clear - только перед DidUpdate')
    });

    return (
        <p> {value} </p>
    );
};



class ClassCounter extends Component {

    componentDidMount() {
        console.log('class: mount')
    }

    componentDidUpdate() {
        console.log('class: update')
    }

    componentWillUnmount() {
        console.log('class: unmount')
    }

    render() {
        return <p>{this.props.value}</p>
    }
}

ReactDOM.render(<App />,
    document.getElementById('root'));
