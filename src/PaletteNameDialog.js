import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";
import "./styles/PaletteNameDialog.css";

function PaletteNameDialog({
  savePalette,
  colors,
  palettes,
  formStage,
  handleClose,
  handleStageChange,
}) {
  const [paletteName, setPaletteName] = useState("");
  const [emoji, setEmoji] = useState({});

  const handlePaletteNameChange = (event) => {
    setPaletteName(event.target.value);
  };

  const handleSavePalette = () => {
    const newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      emoji: emoji,
      colors: colors,
    };
    handleClose();
    savePalette(newPalette);
  };

  const addEmoji = (newEmoji) => {
    setEmoji(newEmoji.native);
  };

  ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
    palettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    )
  );

  return (
    <div>
      <Dialog
        open={formStage === "emoji"}
        onClose={handleClose}
        aria-labelledby="Select an emoji"
      >
        <DialogTitle id="form-dialog-title">
          Choose an Emoji you love ❤
        </DialogTitle>
        <DialogContent>
          <Picker
            set="facebook"
            onSelect={addEmoji}
            title="Pick your emoji…"
            emoji="point_up"
            className="picker"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSavePalette}
          >
            Save Palette
          </Button>
        </DialogActions>
      </Dialog>

      {/* palette name dialog */}
      <Dialog
        open={formStage === "paletteName"}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm
          onSubmit={handleStageChange}
          onError={(errors) => console.log(errors)}
        >
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>

            <TextValidator
              autoFocus
              fullWidth
              margin="normal"
              onChange={handlePaletteNameChange}
              value={paletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name!", "Name already used!"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="paletteBtn"
            >
              Pick an Emoji next
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteNameDialog;
