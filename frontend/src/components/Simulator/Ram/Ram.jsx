import React, { useContext, useRef } from 'react';
import styles from './Ram.module.css';
import ComputerContext from "../../../contexts/ComputerContext";

const Ram = React.memo(() => {
    const { computer } = useContext(ComputerContext);
    const ramTableRef = useRef();

    if (ramTableRef.current && ramTableRef.current.rows.length && computer.initial && computer.start_location > 0)
        ramTableRef.current.rows[computer.start_location - 1].scrollIntoView({});

    return (
        <div className={styles.container}>
            <header>
                <span>Label</span>
                <span>Address</span>
                <span>Instruction</span>
                <span>HEX</span>
            </header>
            <div className={styles.content}>
                <table ref={ramTableRef}>
                    <tbody>
                        {computer.ram.map(r =>
                            <tr key={r.address}>
                                <td>{r.label}</td>
                                <td>0x{String(r.address).padStart(3, '0').toUpperCase()}</td>
                                <td>{r.instruction}</td>
                                <td>0x{r.value.replace('0x', '').padStart(4, '0').toUpperCase()}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
})

export default Ram;