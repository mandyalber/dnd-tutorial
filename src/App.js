import React, { useCallback, useState } from 'react';
import cuid from 'cuid';
import Dropzone from './Dropzone';
import './App.css';
import ImageList from './ImageList';

function App() {
  const [images, setImages] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImages(prevState => [...prevState, { id: cuid(), src: e.target.result }]);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);


  return (
    <div className="App">
      <h1 className="text-center">Drag and Drop Example</h1>
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      <ImageList images={images}/>
    </div>
  );
}

export default App;
