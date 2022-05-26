import { useContext, useState } from 'react';
import ThemeContext from '../../../contexts/ThemeContext';
import CE from 'rmce';
import '../../../assets/prism/mano-asm';
import '../../../assets/prism/prism.css';
import styles from './CodeEditor.module.css';

const CodeBox = () => {
    let { theme } = useContext(ThemeContext);
    let [code, setCode] = useState('');
    return (
        <div className={`${theme || "okaidia"}-theme ${styles.container}`}>
            <CE
                className='rmce'
                language='manoasm'
                onChange={setCode}
                value={code}
            />
        </div>
    );
};

export default CodeBox;