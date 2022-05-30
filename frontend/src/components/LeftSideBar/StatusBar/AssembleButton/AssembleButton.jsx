import styles from './AssembleButton.module.css';
import icon from '../../../../assets/assemble-white.png';

const AssembleButton = () => {
    return (
        <img src={icon} alt='Assemble' className={styles.button} />
    )
};

export default AssembleButton;