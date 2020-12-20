import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";

function NewPaletteFormColorPicker({ colors, addNewColor, maxColors }) {
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
    <div>
      <ChromePicker
        color={background}
        onChangeComplete={handleChangeComplete}
      />
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => console.log(errors)}
      >
        <TextValidator
          onChange={handleColorNameChange}
          value={colorName}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Entering a badass color name is necessary!",
            "Color name already used!",
            "Color already used!",
          ]}
        />
        {/* <p>
            Get creative with your color names. Don't worry! If you don't add
            one, we will assume you were busy and display the HEX code instead
          </p> */}
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
        >
          {colors.length >= maxColors ? "PALETTE FULL" : "ADD COLOR"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default NewPaletteFormColorPicker;
