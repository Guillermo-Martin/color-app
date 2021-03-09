import chroma from 'chroma-js';
import sizes from './../styles/sizes';

export default {
  ColorBox: {
    width: "20%",
    height: props => (props.showingFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: 1,
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: props => (props.showingFullPalette ? "20%" : "33.3333%"),
    },
    [sizes.down("md")]: {
      width: "50%",
      height: props => (props.showingFullPalette ? "10%" : "20%"),
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: props => (props.showingFullPalette ? "5%" : "10%"),
    }
  },
  copyText: {
    // write a function to dynamically change colors; styles automatically has access to props
    // this is one class that has styles that are dynamically generated
    color: props => chroma(props.color).luminance() >= 0.7 ? "black" : "white",
  },
  colorName: {
    color: props => chroma(props.color).luminance() <= 0.08 ? "white" : "black",
  },
  seeMore: {
    color: props => chroma(props.color).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "white",
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    bottom: "0px",
    right: "0px",
    border: "none",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copyButton: {
    color: props => chroma(props.color).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    border: "none",
    textDecoration: "none",
    opacity: 0,
  },
  boxContent: {
    position: "absolute",
    padding: "10px",
    width: "100%",
    left: "0px",
    bottom: "0px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    /* we want the "transform" property (listed below) to transition */
    transition: "transform 0.6s ease-in-out",
    /* get box to start off very small */
    transform: "scale(0.1)",
  },
  showOverlay: {
    opacity: "1",
    /* the scale is based off of the width and height in the overlay */
    /* when activated, the width and height of the overlay will be 50 times its original size */
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
  },
  copyMessage: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    /* flex-direction: column will put the elements in a column */
    flexDirection: "column",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase",
      [sizes.down("xs")]: {
        fontSize: "6rem", 
      }
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
    },
  },
  showMessage: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    transition: "all 0.4s ease-in-out",
    /* delay the showing of the message */
    transitionDelay: "0.3s",
  }
};

