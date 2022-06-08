import React from 'react';
import styles from './App.module.css';
import Simulator from './components/Simulator';
import LeftSideBar from './components/LeftSideBar';
import { Allotment } from "allotment";
import "allotment/dist/style.css";

function App() {
  return (
    <div className={styles.container}>
      <Allotment>
        <Allotment.Pane minSize={350} preferredSize='40%' >
          <LeftSideBar />
        </Allotment.Pane>
        <Allotment.Pane minSize={370}>
          <Simulator />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default App;
