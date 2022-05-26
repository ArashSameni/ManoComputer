import { useState } from 'react';
import CodeEditor from 'rmce';
import '../../assets/prism/mano-asm';
import '../../assets/prism/prism.css';

const CodeBox = ({ theme }) => {
    let [code, setCode] = useState('')
    return (
        <span className={`${theme || "okaidia"}-theme`}>
            <CodeEditor
                className='rmce'
                language='manoasm'
                onChange={setCode}
                value={code}
            />
        </span>
    );
};

export default CodeBox;