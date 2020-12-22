import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import "rc-slider/assets/index.css";
import "./Navbar.css";

function Navbar({ changeLevel, level, handleFormatChange, showSlider }) {
  const [colorFormat, setColorFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setOpen(true);
    setColorFormat(event.target.value);
    handleFormatChange(event.target.value);
  };

  return (
    <nav className="Navbar">
      <div className="Navbar__logo">
        <Link to="/">ReactColorPicker</Link>
      </div>
      {showSlider ? (
        <div className="Navbar__sliderContainer">
          <span>Level: {level}</span>
          <div className="Navbar__slider">
            <Slider
              defaultValue={level}
              step={100}
              min={100}
              max={900}
              onChange={changeLevel}
            />
          </div>
        </div>
      ) : undefined}

      <div className="Navbar__selectContainer">
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={colorFormat}
          onChange={handleChange}
          className="Navbar__select"
        >
          <MenuItem value="hex">
            <em>HEX - #ffffff</em>
          </MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255,1)</MenuItem>
        </Select>
      </div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={3000}
          message={<span id="message__id">Format changed</span>}
          ContentProps={{
            "aria-describedby": "message__id",
          }}
          onClose={handleClose}
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={handleClose}>
                {colorFormat}
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    </nav>
  );
}

export default Navbar;
