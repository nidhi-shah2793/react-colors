import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function PaletteNameDialog({ savePalette, colors, palettes }) {
  const [open, setOpen] = useState(false);
  const [paletteName, setPaletteName] = useState("");

  const handlePaletteNameChange = (event) => {
    setPaletteName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSavePalette = () => {
    const newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      // emoji: ,
      colors: colors,
    };
    savePalette(newPalette);
  };

  ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
    palettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    )
  );

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <ValidatorForm
            onSubmit={handleSavePalette}
            onError={(errors) => console.log(errors)}
          >
            <TextValidator
              onChange={handlePaletteNameChange}
              value={paletteName}
              label="Palette Name"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name!", "Name already used!"]}
            />
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </ValidatorForm>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PaletteNameDialog;
