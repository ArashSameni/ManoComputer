import { useContext } from 'react';
import ThemeContext from '../../../contexts/ThemeContext';
import CE from './rmce';
import '../../../assets/prism/mano-asm';
import '../../../assets/prism/prism.css';
import styles from './CodeEditor.module.css';

const CodeBox = ({ code, onCodeChanged, ...props }) => {
    let { theme } = useContext(ThemeContext);

    return (
        <div className={`${theme || "okaidia"}-theme ${styles.container}`}>
            <CE
                className='rmce'
                language='manoasm'
                onChange={code => onCodeChanged(code)}
                value={code}
                {...props}
            />
        </div>
    );
};

export default CodeBox;