import React, { Component } from 'react';
import Palette from './Palette';
import PaletteList from './PaletteList'
import seedColors from './seedColors';
import {generatePalette} from './Colorhelper';
import {Route, Switch} from 'react-router-dom';
import SingleColor from './SingleColor';
import NewPaletteForm from './NewPaletteForm';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import './App.css'

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
    <Route render={({location})=> (
      <TransitionGroup>
        <CSSTransition classNames='fade' timeout={500} key={location.key}>
          <Switch location={location}>
          <Route exact path='/palette/new' 
          render = {(routeProps) => 
          <div className="page">
          <NewPaletteForm 
          palette={this.state.palette} 
          savePalette={this.savePalette} 
          {...routeProps}/>
          </div>}
          />
          <Route exact path='/palette/:paletteId/:colorId'
          render={(routeProps) => 
          <div className='page'>
          <SingleColor
          colorId = {routeProps.match.params.colorId} 
          palette = {generatePalette(this.findPalette(routeProps.match.params.paletteId))}/>
          </div>}/>
          <Route exact path='/' 
          render={(routeProps) =>
          <div className='page'> 
          <PaletteList 
          palettes={this.state.palette} 
          deletePalette={this.deletePalette} 
          {...routeProps}/>
          </div>}/>
          <Route exact path='/palette/:id' 
          render={(routeProps) => 
          <div className='page'>
          <Palette 
          palette = {generatePalette(this.findPalette(routeProps.match.params.id))}/>
          </div>}/>
          </Switch>
      </CSSTransition>
    </TransitionGroup>
    )}/>
  );
  }
}

export default App;
