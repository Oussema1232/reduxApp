import React from "react";
import { Provider } from "react-redux";
import Bugs from "./components/Bugs";
import configureStore from "./store/configureStore";
import BugsList from "./components/bugsList";
import Projects from "./components/project";

const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <h1 style={{ textAlign: "center", color: "#23395d" }}>
        Manage Project's bugs
      </h1>
      <Projects />
    </Provider>
  );
}

export default App;
