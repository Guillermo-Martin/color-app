import React, { Component } from 'react';
import PaletteList from './../src/containers/PaletteList';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Palette from './containers/Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
  // console.log(generatePalette(seedColors[4]));

  // function to find the correct palette
  findPalette = id => {
    return seedColors.find(palette => {
      // return the palette where the palette's id matches the id passed in
      return palette.id === id;
    });
  }

  render(){
    return (
      <Router>
        <Switch>
          {/* pass all of the palettes to PaletteList as props; for each one create a mini palette */}
          <Route exact path="/" render={(routeProps) => <PaletteList {...routeProps} palettes={seedColors} />} />
  
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
            render={() => <h1>SINGLE COLOR PAGE</h1>}
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
