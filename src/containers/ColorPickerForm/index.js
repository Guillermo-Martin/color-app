import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

const styles = {
  picker: {
    // width: "100%",
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorNameInput: {
    width: "100%",
    height: "70px",
  }
}

class ColorPickerForm extends Component {
  state = {
    currentColor: "teal",
    newColorName: "",
  }

  componentDidMount() {
    // "value" will be whatever is in the input for the color name; we want to check the value to all of the values that are currently
    // in the "colors" state
    // validation to check for a unique color name
    ValidatorForm.addValidationRule('isColorNameUnique', value => 
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    // validation to check that the color itself is unique
    ValidatorForm.addValidationRule('isColorUnique', value => 
      this.props.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
    );
  }

  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    }
    this.props.addNewColor(newColor);
    this.setState({ newColorName: "" });
  }

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;

    return (
      <div>
        {/* 'onChangeComplete' gets called whenever we call a new color */}
        <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} className={classes.picker}/>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator 
            value={newColorName}
            className={classes.colorNameInput}
            placeholder="Color Name"
            name="newColorName"
            variant="filled"
            margin="normal"
            onChange={this.handleChange}
            // to make our own validator using react-material-ui-validator, we add our own validation rule to ValidatorForm in componentDidMount()
            // the order of the validators and error messages matter
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']} 
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={paletteIsFull}
            className={classes.addColor}
            style={{ backgroundColor: paletteIsFull ? "grey" : currentColor} }
          >
            { paletteIsFull ? "Palette Full" : "Add Color" }
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
