import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState("kyle")

  useEffect(() => {
    async function fetchData() {
      let response = await fetch('/data');
      let data = response.json();
      return data;
    }

    fetchData().then(data => {
      console.log(data);
      setData([data.name])
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test Deploy</h1>
      </header>
      <div>
        <h1>{data}</h1>
      </div>
    </div>
  );
}

export default App;