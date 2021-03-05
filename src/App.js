import React, { useCallback, useState } from 'react';
import cuid from 'cuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import update from 'immutability-helper';
import Dropzone from './Dropzone';
import './App.css';
import ImageList from './ImageList';

const isTouchDevice = () => {
  if('ontouchstart' in window) {
    return true;
  }
  return false;
};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

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

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];

    setImages(
      update(images, { $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]] })
    );
  };

  return (
    <div className="App">
      <h1 className="text-center">Drag and Drop Example</h1>
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      <DndProvider backend={backendForDND}>
        <ImageList images={images} moveImage={moveImage} />
      </DndProvider>
    </div>
  );
}

export default App;
