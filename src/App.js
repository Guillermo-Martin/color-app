import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Palette from './containers/Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
  // console.log(generatePalette(seedColors[4]));
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <h1>PALETTE LIST GOES HERE</h1>} />
        <Route exact path="/palette/:id" render={() => <h1>INDIVIDUAL PALETTE GOES HERE</h1>} />
      </Switch>
      
      {/* <div>
        Pass newly generated palette to Palette component
        <Palette palette={generatePalette(seedColors[4])} /> 
      </div> */}
    </Router>
    
  );
}

export default App;
