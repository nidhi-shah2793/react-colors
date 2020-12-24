import React, { useState } from "react";
import { Link } from "react-router-dom";

import MiniPalette from "./MiniPalette";

import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import bg from "./styles/bg.svg";

const styles = {
  "@global": {
    ".fade-exit": {
      opacity: "1",
    },
    ".fade-exit-active": {
      opacity: "0",
      transition: "opacity 0.5s ease-out",
    },
    ".fade-enter": {
      opacity: "0.1",
    },
    ".fade-enter-active": {
      opacity: "1",
      transition: "opacity 0.5s ease-out",
    },
  },
  root: {
    backgroundColor: "white",
    backgroundImage: `url(${bg})`,
    /* background by SVGBackgrounds.com */
    backgroundSize: "cover",
    minHeight: "100vh",
    height: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "65%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: "0.5rem",
    // until sm
    "@media (max-width:767.98px)": {
      flexDirection: "column",
      width: "60%",
    },
    // between sm and md
    "@media (min-width:767.98px) and (max-width: 991.98px)": {
      width: "70%",
    },
    // between md and lg
    "@media (min-width:991.98px) and (max-width: 1199.98px)": {
      width: "80%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
    },
    // backgroundColor: "#945f9c",
    // until sm
    "@media (max-width:767.98px)": {
      flexWrap: "wrap",
      justifyContent: "center",
    },
  },
  palettes: {
    height: "auto",
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: "2rem",
  },
  heading: {
    fontSize: "2rem",
    // until sm
    "@media (max-width:767.98px)": {
      fontSize: "1.5rem",
      textDecoration: "3px white underline",
    },
  },
  createBtn: {
    backgroundColor: "#e9edf0",
    color: "#da4181",
    fontWeight: "bold",
    margin: "1rem",
    "&:hover": {
      backgroundColor: "#e9edf0",
      color: "#da4181",
      boxShadow: "4px 6px 8px rgba(0,0,0,0.3) !important",
    },
    "&:active": {
      backgroundColor: "#e9edf0",
      color: "#da4181",
    },
    // until sm
    "@media (max-width:767.98px)": {
      width: "100% !important",
      margin: "0",
      marginBottom: "1rem",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    // until sm
    "@media (max-width:767.98px)": {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    // between sm and md
    "@media (min-width:767.98px) and (max-width: 991.98px)": {
      width: "70%",
    },
  },

  emptyContainer: {
    backgroundColor: "rgba(244,244,244,0.3)",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    width: "100%",
    // until sm
    "@media (max-width:767.98px)": {
      marginTop: "1rem",
      fontSize: "15px",
      padding: "10px",
      paddingBottom: "25px",
    },
  },
};

function PaletteList({ classes, palettes, deletePalette, restorePalettes }) {
  const [open, setOpen] = useState(false);
  const [deletingPalette, setDeletingPalette] = useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setDeletingPalette("");
  };

  function storeDeletePalette(paletteName) {
    setDeletingPalette(paletteName);
  }

  const handleDelete = () => {
    deletePalette(deletingPalette);
    handleClose();
  };

  let msg;
  msg = palettes.map((palette) => (
    <CSSTransition key={palette.id} timeout={500} classNames="fade">
      <MiniPalette
        {...palette}
        deletePalette={deletePalette}
        handleClickOpen={handleClickOpen}
        storeDeletePalette={storeDeletePalette}
      />
    </CSSTransition>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>ReactColorPicker</h1>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.createBtn}
              onClick={restorePalettes}
            >
              Restore Palettes
            </Button>
            <Link to="/palettes/new">
              <Button
                variant="contained"
                color="primary"
                className={classes.createBtn}
              >
                Create Palette
              </Button>
            </Link>
          </div>
        </nav>
        <TransitionGroup className={classes.palettes}>{msg}</TransitionGroup>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Delete confirmation"
        aria-describedby="Are you sure you want to delete?"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this palette?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We would be sad to see this palette go...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
