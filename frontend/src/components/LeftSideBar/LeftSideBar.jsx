import { useContext, useEffect, useState } from 'react';
import ComputerContext from '../../contexts/ComputerContext'
import FilesBar from './FilesBar';
import CodeEditor from './CodeEditor';
import StatusBar from './StatusBar';
import AboutUs from './AboutUs';
import styles from './LeftSideBar.module.css';

const LeftSideBar = () => {
    const [files, setFiles] = useState([{
        id: 0,
        fileName: 'Untitled-1.asm',
        content: '',
        saved: true,
        path: null
    }]);
    const [currentFileID, setCurrentFileID] = useState(0);
    const currentFile = files.find(f => f.id === currentFileID);
    const { setComputer } = useContext(ComputerContext);

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

    window.electronAPI.handleSaveFile(event => {
        if (currentFile && currentFile.path)
            event.sender.send('SAVE_FILE', currentFile)
        else if (currentFile)
            event.sender.send('SAVE_AS', currentFile)
    })

    window.electronAPI.handleSaveAs(event => {
        if (currentFile)
            event.sender.send('SAVE_AS', currentFile)
    })

    window.electronAPI.handleFilePathChanged((_, newPath) => {
        const fileName = newPath.split('\\').pop().split('/').pop()
        setFiles(prev => prev.map(
            f => f.id === currentFileID ? { ...f, fileName, path: newPath, saved: true } : f
        ))
    })

    window.electronAPI.onFileSaved(() => {
        setFiles(prev => prev.map(
            f => f.id === currentFileID ? { ...f, saved: true } : f
        ))
    })

    window.electronAPI.onChangeFiles((_, newFiles) => setFiles(newFiles))

    window.electronAPI.handleCloseFile((_, id) => {
        if (id === -1) {
            if (files.length)
                handleFileClose(currentFileID);
            return;
        }
        setFiles(prev => prev.filter(f => f.id !== id))
    })

    window.electronAPI.handleCloseAll(() => window.electronAPI.onAllClose(files))

    const handleCodeChange = code => {
        setFiles(prev => {
            return prev.map(f => f.id === currentFileID ? { ...f, content: code, saved: !f.path && !code } : { ...f })
        })
    }

    const handleFileChange = id => setCurrentFileID(id);
    const handleFileClose = id => window.electronAPI.onFileClose(files.find(f => f.id === id));

    useEffect(() => {
        if (files.length !== 0 && !files.some(f => f.id === currentFileID))
            setCurrentFileID(prev => {
                const anotherFile = files.find(f => f.id !== prev)
                return anotherFile ? anotherFile.id : 0;
            })
    }, [files, currentFileID])

    const handleAssemble = () => {
        fetch(process.env.REACT_APP_API + 'load', {
            method: 'POST',
            body: JSON.stringify({ code: currentFile.content.split('\n') })
        })
            .then(response => response.json())
            .then(data => {
                setComputer({...data, initial: true});
                alert("Assemble successful")
            })
            .catch(e => alert('Error: ' + e))
    }

    return (
        <div className={styles.LeftSideBar}>
            <FilesBar files={files} currentFileID={currentFileID} onFileChanged={handleFileChange} onFileClosed={handleFileClose} />
            {files.length > 0 && <CodeEditor readOnly={files.length === 0} code={currentFile?.content || ''} onCodeChanged={handleCodeChange} />}
            {files.length === 0 && <AboutUs />}
            {files.length > 0 && <StatusBar onAssemble={handleAssemble} />}
        </div>
    );
};

export default LeftSideBar;