import CodeEditor from './CodeEditor';
import StatusBar from './StatusBar';
import styles from './LeftSideBar.module.css';
import FilesBar from './FilesBar';

const LeftSideBar = () => {
    return (
        <div className={styles.LeftSideBar}>
            <FilesBar />
            <CodeEditor />
            <StatusBar />
        </div>
    );
};

export default LeftSideBar;