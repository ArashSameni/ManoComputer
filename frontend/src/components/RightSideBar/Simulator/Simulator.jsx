import { useState, useContext } from "react";
import Ram from "./Ram";
import ComputerContext from "../../../contexts/ComputerContext";
import styles from './Simulator.module.css';

const Simulator = () => {
    const [clockRate, setClockRate] = useState(1);
    const { computer, setComputer } = useContext(ComputerContext);

    const registers = [
        { name: 'SC', value: computer.SC },
        { name: 'PC', value: computer.PC },
        { name: 'AR', value: computer.AR },
        { name: 'IR', value: computer.IR },
        { name: 'DR', value: computer.DR },
        { name: 'AC', value: computer.AC },
        { name: 'TR', value: computer.TR },
        { name: 'INPR', value: computer.INPR },
        { name: 'OUTR', value: computer.OUTR },
    ]

    const flags = [
        { name: 'I', value: computer.I },
        { name: 'S', value: computer.S },
        { name: 'E', value: computer.E },
        { name: 'R', value: computer.R },
        { name: 'IEN', value: computer.IEN },
        { name: 'FGI', value: computer.FGI },
        { name: 'FGO', value: computer.FGO },
    ]

    const handleStepClick = async () => {
        if (!computer.S)
            await fetch(process.env.REACT_APP_API + 'start', { method: 'POST' })
        const resp = await fetch(process.env.REACT_APP_API + 'clock')
        const data = await resp.json()
        setComputer(data)
    };

    return (
        <>
            <div className={styles.container}>
                <div>
                    <p className={`${styles.description} ${styles.micro}`}>
                        MicroOperation:
                        <label className={styles.value}>{computer.last_instructions.slice(-1)[0]}</label>
                    </p>
                    <div className={styles.registers}>
                        {registers.map(reg => (
                            <p key={reg.name} className={styles.description}>
                                {reg.name}:
                                <label className={styles.value}>{reg.value}</label>
                            </p>
                        ))}
                    </div>
                    <div className={styles.flags}>
                        {flags.map(flag => (
                            <p key={flag.name} className={styles.description}>
                                {flag.name}:
                                <label className={styles.value}>{flag.value}</label>
                            </p>
                        ))}
                    </div>
                    <div className={styles.clockContainer}>
                        <p className={styles.description}>Clock Rate:</p>
                        <input type="range" className={styles.range} value={clockRate} min={1} max={10} onChange={e => setClockRate(e.target.value)} />
                        <label>{clockRate}</label>
                    </div>
                    <div className={styles.buttons}>
                        <button>RUN</button>
                        <button onClick={handleStepClick}>STEP</button>
                        <button>RESET</button>
                    </div>
                </div>
            </div>
            <Ram />
        </>
    );
}

export default Simulator;