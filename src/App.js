import React from 'react';
import Palette from './Palette'
import seedColors from './seedColors';
import {generatePalette} from './Colorhelper'

function App() {
  return (
    <div className="App">
      <Palette palette = {generatePalette(seedColors[6])}/>
    </div>
  );
}

export default App;
