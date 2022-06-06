import React, { useState, useEffect } from 'react';

const ComputerContext = React.createContext({
    computer: {},
    setComputer: () => { }
});

export const ComputerContextProvider = ({ children }) => {
    const [computer, setComputer] = useState({
        AC: '0x0', AR: '0x0', DR: '0x0',
        E: 0, FGI: 0, FGO: 0, I: 0, IEN: 0,
        INPR: '0x0', IR: '0x0', OUTR: '0x0', PC: '0x0',
        R: 0, S: 0, SC: 0, TR: '0x0',
        last_instructions: [], ram: []
    });

    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'reset', { method: 'POST' })
            .then(resp => resp.json())
            .then(data => setComputer(data))
            .catch(() => alert('Error: Failed to connect to server'))
    }, []);

    return (
        <ComputerContext.Provider value={{ computer, setComputer }}>
            {children}
        </ComputerContext.Provider>
    );
};

export default ComputerContext;