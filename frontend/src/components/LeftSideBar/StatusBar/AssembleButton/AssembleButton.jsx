import styles from './AssembleButton.module.css';
import icon from '../../../../assets/assemble-white.png';

const AssembleButton = props => {
    return (
        <img src={icon} alt='Assemble' className={styles.button} {...props} />
    )
};

export default AssembleButton;