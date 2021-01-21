import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const App = () => {
    return (
        <div>
            <HookSwitcher />
        </div>
    );
};


const HookSwitcher = () => {

    const [ color, setColor ] = useState('white');
    const [ fontSize, setFontSize ] = useState(18);
    const [ person, setPerson ] = useState({
        name: 'Sasha',
        gender: 'male'
    });

    function changeGender() {
        setPerson((person) => {
            const gender = person.gender === 'male' ? 'female' : 'male';
            return {... person, gender: gender}
        })
    }

    return (
        <div style={{ padding: "10px",
            backgroundColor: color,
            fontSize: `${fontSize}px`}}>
            <p> Hi </p>
            <button
                onClick={() => setColor('black')}>
                Dark
            </button>
            <button
                onClick={() => setColor('white')}>
                Light
            </button>
            <button
                onClick={() => setFontSize((fontSize) => fontSize + 2)}>
                +
            </button>
            <p> {`${person.name}: ${person.gender}`} </p>
            <button
                onClick={changeGender}>
                Change gender
            </button>
        </div>
    );
};


ReactDOM.render(<App />,
    document.getElementById('root'));
