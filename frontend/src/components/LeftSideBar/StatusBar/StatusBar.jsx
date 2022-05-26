import styles from './StatusBar.module.css';
import ToggleButton from "./ToggleButton";
import AssembleButton from "./AssembleButton";

const StatusBar = () => {
    return (
        <div className={styles.container}>
            <ToggleButton />
            <AssembleButton />
        </div>
    )
}

export default StatusBar;