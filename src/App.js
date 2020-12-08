import Palette from './containers/Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
  // console.log(generatePalette(seedColors[4]));
  return (
    <div>
      {/* Pass newly generated palette to Palette component */}
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
  );
}

export default App;
