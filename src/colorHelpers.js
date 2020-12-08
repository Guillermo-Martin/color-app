import chroma from 'chroma-js';
// different levels for each color
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// function to generate all the shades for each color
function generatePalette(starterPalette) {

  // palette to return
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  };

  // this will build us a new colors object that contains 50 set to an empty array,
  // 100 set to an empty array, 200 set to an empty array, etc.
  for(let level of levels){
    newPalette.colors[level] = [];
  }

  // loop through every color; for every color in the starter palette, generate a scale
  // for all those different colors, take the lightest color and assign it to the '50' value,
  // take the next darkest and assign it to the '100' value, etc.
  for(let color of starterPalette.colors){
    let scale = getScale(color.color, 10).reverse(); // <-- this will give us 10 colors

    // for each one of those colors...
    for(let i in scale){
      // ...we're going to add in to our new palette
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(), // <--- ".css" will give us an RGB color
        rgba: chroma(scale[i]).css().replace("rbga", "rbga").replace(")", ",1.0)")
      });
    }
  }
  return newPalette;
}

// function to get range of colors using chroma
function getRange(hexColor){
  // define the end color
  const end = "#fff";

  // generate an array with 3 color values: a darker version of the color, the actual color, and white (the end color)
  return [
    chroma(hexColor).darken(1.4).hex(),
    hexColor,
    end
  ];

}

// function to give us 10 colors based off of an input color
function getScale(hexColor, numberOfColors) {
  // ".mode" will set the color mode
  // ".colors" will take the scale we generated and give us X number of colors
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePalette };