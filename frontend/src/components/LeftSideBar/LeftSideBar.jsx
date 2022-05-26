import CodeEditor from './CodeEditor';
import StatusBar from './StatusBar';
import styles from './LeftSideBar.module.css';

const LeftSideBar = () => {
    return (
        <div className={styles.LeftSideBar}>
            <CodeEditor />
            <StatusBar />
        </div>
    );
};

export default LeftSideBar;