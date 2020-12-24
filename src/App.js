import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import PaletteGen from "./PaletteGen";
import PaletteList from "./PaletteList";
import SinglePaletteGen from "./SinglePaletteGen";
import NewPaletteForm from "./NewPaletteForm";

import { seedColors } from "./seedColors";
import "./styles/App.css";

function App() {
  const history = useHistory();

  const localStoragePalettes = JSON.parse(
    window.localStorage.getItem("palettes")
  );
  const [palettes, setPalettes] = useState(localStoragePalettes || seedColors);

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
    history.push("/");
  };

  function deletePalette(paletteName) {
    const filteredPalettes = palettes.filter(
      (palette) => palette.paletteName !== paletteName
    );
    setPalettes(filteredPalettes);
  }

  const restorePalettes = () => {
    setPalettes(seedColors);
  };

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/palettes/new">
          <NewPaletteForm savePalette={savePalette} palettes={palettes} />
        </Route>
        <Route exact path="/palettes/:paletteId/:colorId">
          <SinglePaletteGen palettes={palettes} />
        </Route>
        <Route exact path="/palettes/:paletteId">
          <PaletteGen palettes={palettes} />
        </Route>
        <Route exact path="/">
          <PaletteList palettes={palettes} deletePalette={deletePalette} restorePalettes={restorePalettes} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
