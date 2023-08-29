import React, { useState }from 'react';
import useFileToBuffer from './hooks/useFileToBuffer';
import "./App.css";


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [arrayBuffer, error] = useFileToBuffer(file);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  )
}

export default App;
