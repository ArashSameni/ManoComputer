import styles from './FilesBar.module.css';

const FilesBar = ({ files, currentFileID, onFileChanged, onFileClosed }) => {
    return (
        <div className={styles.container}>
            {files.map(f => (
                <span key={f.id} onClick={() => onFileChanged(f.id)} className={`${styles.tab} ${f.id === currentFileID && styles.active}`}>
                    <span>{f.fileName}</span>
                    <div onClick={() => onFileClosed(f.id)} className={styles.close}>x</div>
                </span>
            ))}
        </div>
    )
}

export default FilesBar;