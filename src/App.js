import React from 'react';
import './App.css';
import Palette from './Palette'
import seedColors from './seedColors';
import {generatePalette} from './Colorhelper'

function App() {
  console.log(generatePalette(seedColors[6]))
  return (
    <div className="App">
      <Palette {...seedColors[6]}/>
    </div>
  );
}

export default App;
