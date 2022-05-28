import styles from './FilesBar.module.css';

const files = [
    { fileName: 'Untitled-1.asm', active: false, path: '1'},
    { fileName: 'Untitled-2.asm', active: true, path: '2'},
    { fileName: 'mmd.asm', active: false, path: '3'},
]

const FilesBar = () => {
    return (
        <div className={styles.container}>
            {files.map(f => (
                <span key={f.path} className={`${styles.tab} ${f.active && styles.active}`}>
                    <span>{f.fileName}</span>
                    <div className={styles.close}>x</div>
                </span>
            ))}
        </div>
    )
}

export default FilesBar;