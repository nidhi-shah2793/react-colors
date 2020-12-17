import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import PaletteGen from "./PaletteGen";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SinglePaletteGen";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/palettes/:paletteId/:colorId">
          <SingleColorPalette />
        </Route>
        <Route exact path="/palettes/:paletteId">
          <PaletteGen />
        </Route>
        <Route exact path="/">
          <PaletteList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
