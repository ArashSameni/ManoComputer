import styles from './AssembleButton.module.css';
import icon from '../../../../assets/play-icon.png';

const AssembleButton = () => {
    return (
        <a href="/#"><img src={icon} alt='Build Button' className={styles.button} /></a>
    )
};

export default AssembleButton;