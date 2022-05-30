import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import StatusBar from './StatusBar';
import styles from './LeftSideBar.module.css';
import FilesBar from './FilesBar';

const LeftSideBar = () => {
    const [files, setFiles] = useState([{
        id: 0,
        fileName: 'Untitled-1.asm',
        content: '',
        path: null
    }]);
    const [currentFileID, setCurrentFileID] = useState(0);

    window.electronAPI.handleOpenFile((_, file) => {
        setFiles(prev => {
            if (prev.some(f => f.path === file.path))
                return prev.map(f => f.path === file.path ? file : f)
            return [...prev, file]
        })
        setCurrentFileID(file.id)
    })

    window.electronAPI.handleNewFile((_, file) => {
        setFiles(prev => {
            if (prev.some(f => f.id === prev.id))
                return prev
            return [...prev, file]
        })
        setCurrentFileID(file.id)
    })

    const handleCodeChange = code => {
        setFiles(prev => {
            return prev.map(f => f.id === currentFileID ? { ...f, content: code } : { ...f })
        })
    }

    const handleFileChange = id => setCurrentFileID(id);
    const handleFileClose = id => setFiles(prev => prev.filter(f => f.id !== id));

    useEffect(() => {
        if (files.length !== 0 && !files.some(f => f.id === currentFileID))
            setCurrentFileID(prev => {
                const anotherFile = files.find(f => f.id !== prev)
                return anotherFile ? anotherFile.id : 0;
            })
    }, [files, currentFileID])

    return (
        <div className={styles.LeftSideBar}>
            <FilesBar files={files} currentFileID={currentFileID} onFileChanged={handleFileChange} onFileClosed={handleFileClose} />
            <CodeEditor readOnly={files.length === 0} code={files.find(f => f.id === currentFileID)?.content || ''} onCodeChanged={handleCodeChange} />
            <StatusBar />
        </div>
    );
};

export default LeftSideBar;