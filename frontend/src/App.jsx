import React, { useState } from 'react';
import styles from './App.module.css';
import RightSideBar from './components/RightSideBar';
import LeftSideBar from './components/LeftSideBar';
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
          <LeftSideBar />
        </Allotment.Pane>
        <Allotment.Pane>
          <RightSideBar />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default App;
