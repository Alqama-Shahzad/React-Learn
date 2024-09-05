import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  const increase = () => {
    if (counter < 20) {
      setCounter(counter + 1);
    }
  };
  const decrease = () => {
    setCounter(counter - 1);
  };
  const reset = () => {
    setCounter(0);
  };

  return (
    <>
      <h1>Counter Using React useState</h1>
      <h2>Counter value: {counter}</h2>
      <button onClick={increase}>Increase Value</button>
      <button onClick={reset}>Reset Value</button>
      <button onClick={decrease}>Decrease Value</button>
    </>
  );
}

export default App;
