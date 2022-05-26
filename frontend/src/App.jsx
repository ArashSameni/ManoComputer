import React, { useState } from 'react';
import styles from './App.module.css';
import CodeEditor from './components/CodeEditor';
import Tabs from './components/Tabs';
import { Allotment } from "allotment";
import "allotment/dist/style.css";

function App() {
  const [theme, setTheme] = useState('okaidia');
  const handleToggle = () => {
    setTheme(prev => prev === "okaidia" ? "tomorrow" : "okaidia")
  }
  return (
    <div className={styles.container}>
      <Allotment>
        <Allotment.Pane minSize={350} preferredSize='40%' >
          <CodeEditor theme={theme} />
        </Allotment.Pane>
        <Allotment.Pane>
          <Tabs />
            <button onClick={handleToggle}>Toggle</button>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default App;
