import React, { Component } from 'react';
import Palette from './Palette';
import PaletteList from './PaletteList'
import seedColors from './seedColors';
import {generatePalette} from './Colorhelper';
import {Route, Switch} from 'react-router-dom';
import SingleColor from './SingleColor';

class App extends Component {
  findPalette(id){
    return seedColors.find(function(palette){
      return palette.id === id
    })
  };
  render(){
  return (
    <Switch>
      <Route exact path='/palette/:paletteId/:colorId'
      render={() => <SingleColor/>}/>
      <Route exact path='/' 
      render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps}/>}/>
      <Route exact path='/palette/:id' 
      render={(routeProps) => <Palette palette = {generatePalette(this.findPalette(routeProps.match.params.id))}/>}/>
    </Switch>

  );
  }
}

export default App;
