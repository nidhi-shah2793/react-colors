import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PaletteGen from "./PaletteGen";
import PaletteList from "./PaletteList";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/palettes/:id">
          <PaletteGen />
        </Route>
        <Route exact path="/">
          <PaletteList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
