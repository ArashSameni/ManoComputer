import styles from './StatusBar.module.css';
import ToggleButton from "./ToggleButton";
import AssembleButton from "./AssembleButton";

const StatusBar = ({onAssemble}) => {
    return (
        <div className={styles.container}>
            <ToggleButton />
            <AssembleButton onClick={onAssemble} />
        </div>
    )
}

export default StatusBar;