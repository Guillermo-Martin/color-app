import React, { Component } from 'react';
import PaletteList from './../src/containers/PaletteList';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Palette from './containers/Palette';
import seedColors from './seedColors';
import NewPaletteForm from './containers/NewPaletteForm';
import SingleColorPalette from './containers/SingleColorPalette';
import { generatePalette } from './colorHelpers';


// check local storage
const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));


class App extends Component {
  state = {
    // if there are palettes in localStorage, use that; otherwise use "seedColors" data
    palettes: savedPalettes || seedColors,
  }
  
  // function to find the correct palette
  findPalette = id => {
    return this.state.palettes.find(palette => {
      // return the palette where the palette's id matches the id passed in
      return palette.id === id;
    });
  }

  savePalette = newPalette => {
    // save the newPalette into state; spread out the existing seedColors then add the newPalette
    // after setting the state, save the palettes to local storage
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage);
  }

  // save palettes to local storage
  syncLocalStorage = () => {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route 
            exact path="/palette/new" render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps}/>} />
          {/* pass all of the palettes to PaletteList as props; for each one create a mini palette */}
          <Route exact path="/" render={(routeProps) => <PaletteList {...routeProps} palettes={this.state.palettes} />} />
  
          {/* get the id from the path (using 'match.params.id' from react router), and use it to find the right palette with that id inside of our seed colors*/}
          <Route 
            exact 
            path="/palette/:id" 
            render={routeProps => 
            <Palette palette={generatePalette(
              // take the id from the url, find the starter palette in seedColors, then call generate palette, then pass it as props to Palette component
              this.findPalette(routeProps.match.params.id)
              )}/> } 
          />

          <Route 
            exact 
            path="/palette/:paletteId/:colorId" 
            render={routeProps => 
              <SingleColorPalette 
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}/> } 
          />
        </Switch>
        
        {/* <div>
          Pass newly generated palette to Palette component
          <Palette palette={generatePalette(seedColors[4])} /> 
        </div> */}
      </Router>  
    );
  }
}

export default App;
