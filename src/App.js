import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import PaletteGen from "./PaletteGen";
import PaletteList from "./PaletteList";
import SinglePaletteGen from "./SinglePaletteGen";
import NewPaletteForm from "./NewPaletteForm";
import { seedColors } from "./seedColors";

function App() {
  const [palettes, setPalettes] = useState(seedColors);

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

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
          <PaletteList palettes={palettes} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
