import React, { Component } from 'react';
import PaletteList from './../src/containers/PaletteList';
import Page from './components/Page';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Palette from './containers/Palette';
import seedColors from './seedColors';
import NewPaletteForm from './containers/NewPaletteForm';
import SingleColorPalette from './containers/SingleColorPalette';
import { generatePalette } from './colorHelpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


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

  // function to delete palette
  deletePalette = id => {
    // find the palette with a particular id using filter; for each palette, where the palette.id isn't equal to the id being passed in we'll add it to a new array
    // thus leaving out the palette that does match
    this.setState(state => ({ palettes: state.palettes.filter(palette => palette.id !== id) }),

    // then update localStorage with the new set of palettes; will be called when setState is done
    this.syncLocalStorage
    );
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
        {/* We have a route that is always rendering; so now we can add our Transition group */}
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              <Switch location={location}>
                <Route 
                  exact path="/palette/new" render={(routeProps) => 
                    <Page>
                      <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps}/>
                    </Page>
                  } 
                />
                {/* pass all of the palettes to PaletteList as props; for each one create a mini palette */}
                <Route 
                  exact path="/" render={(routeProps) => 
                    <Page>
                      <PaletteList {...routeProps} palettes={this.state.palettes} deletePalette={this.deletePalette} />
                    </Page>
                  }
                />
        
                {/* get the id from the path (using 'match.params.id' from react router), and use it to find the right palette with that id inside of our seed colors*/}
                <Route 
                  exact path="/palette/:id" render={routeProps =>
                    <Page>
                      <Palette palette={generatePalette(
                        // take the id from the url, find the starter palette in seedColors, then call generate palette, then pass it as props to Palette component
                        this.findPalette(routeProps.match.params.id)
                      )}/> 
                    </Page>
                  } 
                />

                <Route 
                  exact path="/palette/:paletteId/:colorId" render={routeProps => 
                    <Page>
                      <SingleColorPalette 
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}/> 
                    </Page>
                  } 
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}/>
      </Router>  
    );
  }
}

export default App;
