import styles from './FilesBar.module.css';

const FilesBar = ({ files, currentFileID, onFileChanged, onFileClosed }) => {
    const handleFileClose = (e, id) => {
        e.stopPropagation();
        onFileClosed(id);
    }

    return (
        <div className={styles.container}>
            {files.map(f => (
                <span key={f.id} onClick={() => onFileChanged(f.id)} className={`${styles.tab} ${f.id === currentFileID && styles.active}`}>
                    <span>{f.fileName}{!f.saved ? '*' : ''}</span>
                    <div onClick={e => handleFileClose(e, f.id)} className={styles.close}>x</div>
                </span>
            ))}
        </div>
    )
}

export default FilesBar;