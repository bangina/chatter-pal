import { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("red");
  const onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color: string) => {
        document.body.style.backgroundColor = color;
      },
    });
    //
  };
  return (
    <>
      <input type="color" onChange={(e) => setColor(e.currentTarget.value)} />
      <button onClick={() => onclick()}>Click me</button>
    </>
  );
}

export default App;
