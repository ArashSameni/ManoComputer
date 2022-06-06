import { useContext } from 'react';
import styles from './Ram.module.css';
import ComputerContext from "../../../../contexts/ComputerContext";

const Ram = () => {
    const { computer: { ram } } = useContext(ComputerContext);

    return (
        <div className={styles.container}>
            <header>
                <span>Label</span>
                <span>Address</span>
                <span>Instruction</span>
                <span>HEX</span>
            </header>
            <div className={styles.content}>
                <table>
                    <tbody>
                        {ram.map(r =>
                            <tr>
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
}

export default Ram;