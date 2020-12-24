import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  picker: {
    width: "100% !important",
    marginTop: "1rem",
  },
  addColorBtn: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "2rem",
    marginTop: "1rem",
    "@media (max-width: 575.98px)": {
      padding: "0.2rem",
      fontSize: "1.5rem",
    },
  },
  colorNameInput: {
    width: "100%",
    height: "60px",
  },
}));

function NewPaletteFormColorPicker({ colors, addNewColor, maxColors }) {
  const classes = useStyles();
  const [background, setBackground] = useState("#377ED1");
  const [colorName, setColorName] = useState("");

  ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
    colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
  );

  ValidatorForm.addValidationRule("isColorUnique", (value) =>
    colors.every(({ color }) => color !== background)
  );

  const handleSubmit = () => {
    const newColor = {
      name: colorName === "" ? background : colorName,
      color: background,
    };
    addNewColor(newColor);
    setColorName("");
  };

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  const handleColorNameChange = (event) => {
    setColorName(event.target.value);
  };

  return (
    <div className={classes.container}>
      <ChromePicker
        color={background}
        onChangeComplete={handleChangeComplete}
        className={classes.picker}
      />
      <ValidatorForm
        onSubmit={handleSubmit}
        instantValidate={false}
        onError={(errors) => console.log(errors)}
      >
        <TextValidator
          variant="filled"
          placeholder="Color Name"
          className={classes.colorNameInput}
          onChange={handleColorNameChange}
          value={colorName}
          margin="normal"
          validators={["isColorUnique", "required", "isColorNameUnique"]}
          errorMessages={[
            "Color already used!",
            "Enter a color name!",
            "Color name already used!",
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={
            colors.length >= maxColors
              ? { backgroundColor: "gray", color: "white" }
              : { backgroundColor: background }
          }
          disabled={colors.length >= maxColors}
          className={classes.addColorBtn}
        >
          {colors.length >= maxColors ? "PALETTE FULL" : "ADD COLOR"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default NewPaletteFormColorPicker;
