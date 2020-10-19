import React, { Component } from 'react';
import Palette from './Palette';
import PaletteList from './PaletteList'
import seedColors from './seedColors';
import {generatePalette} from './Colorhelper';
import {Route, Switch} from 'react-router-dom';
import SingleColor from './SingleColor';
import NewPaletteForm from './NewPaletteForm'

class App extends Component {
  constructor(props){
    super(props)
    const savedPalettes = JSON.parse(window.localStorage.getItem('palette'))
    this.state = {
      palette: savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id){
    return this.state.palette.find(function(palette){
      return palette.id === id
    })
  };

  deletePalette(id){
    this.setState(
      st => ({palette: st.palette.filter(p => p.id !== id)}),
      this.syncLocalStorage
    )
  }

  savePalette(newPalette){
    this.setState({
      palette: [...this.state.palette, newPalette]
    }, this.syncLocalStorage)
  };

  syncLocalStorage(){
    window.localStorage.setItem('palette', JSON.stringify(this.state.palette))
  }

  render(){
  return (
    <Switch>
      <Route exact path='/palette/new' 
      render = {(routeProps) => <NewPaletteForm palette={this.state.palette} savePalette={this.savePalette} {...routeProps}/>}
      />
      <Route exact path='/palette/:paletteId/:colorId'
      render={(routeProps) => <SingleColor
      colorId = {routeProps.match.params.colorId} 
      palette = {generatePalette(this.findPalette(routeProps.match.params.paletteId))}/>}/>
      <Route exact path='/' 
      render={(routeProps) => <PaletteList palettes={this.state.palette} deletePalette={this.deletePalette} {...routeProps}/>}/>
      <Route exact path='/palette/:id' 
      render={(routeProps) => <Palette palette = {generatePalette(this.findPalette(routeProps.match.params.id))}/>}/>
    </Switch>

  );
  }
}

export default App;
