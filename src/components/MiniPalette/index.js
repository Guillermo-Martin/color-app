import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  main: {
    backgroundColor: "purple",
    border: "3px solid teal",
  },
  secondary: {
    backgroundColor: "pink",
  },
}


function MiniPalette(props) {
  const { classes } = props;
  console.log(classes);

  return (
    <div className={classes.main}>
      <h1>I'm a MiniPalette</h1>
      <section className={classes.secondary}>sdfasdfdsafd</section>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
