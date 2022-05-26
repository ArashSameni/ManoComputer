import { useContext } from 'react';
import ThemeContext from '../../../../contexts/ThemeContext';
import styles from './ToggleButton.module.css';

const ToggleButton = () => {
    const { toggleTheme } = useContext(ThemeContext);
    return (
        <button className={styles.button} onClick={toggleTheme}>Toggle Theme</button>
    )
};

export default ToggleButton;