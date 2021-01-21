import React, {createContext, useContext} from 'react';
import ReactDOM from 'react-dom';


const MyContext = createContext();

const App = () => {
    return (
        <MyContext.Provider value="Hi">
            <SomeComponent />
        </MyContext.Provider>
    );
};

function useContextValue() {
    return useContext(MyContext)
}


const SomeComponent = () => {
    const contValue = useContext(MyContext)
    return (
        <div>
            <p> {contValue} </p>
            <p> {useContextValue()} </p>
        </div>
    )
};


ReactDOM.render(<App />,
    document.getElementById('root'));
