import styles from './Ram.module.css';

const Ram = () => {
    const rows = [];
    for (let i = 0; i < 50; i++)
        rows.push({ Label: (i * i).toString(), Address: i, Instruction: 'DEC ' + i.toString() })

    return (
        <div className={styles.container}>
            <header>
                <th>Address</th>
                <th>Label</th>
                <th>Instruction</th>
                <th>HEX</th>
            </header>
            <div className={styles.content}>
                <table>
                    <tbody>
                        {rows.map(r =>
                            <tr>
                                <td>{r.Label}</td>
                                <td>{r.Address}</td>
                                <td>{r.Instruction}</td>
                                <td>0</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Ram;