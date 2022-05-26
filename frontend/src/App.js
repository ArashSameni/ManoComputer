import React, { useState } from 'react';
import CodeBox from './components/CodeBox';

function App() {
  const [theme, setTheme] = useState('okaidia');
  const handleToggle = () => {
    setTheme(prev => prev === "okaidia" ? "tomorrow" : "okaidia")
  }
  return (
    <div className="App">
      <button onClick={handleToggle}>Toggle</button>
      <CodeBox theme={theme}/>
    </div>
  );
}

export default App;
