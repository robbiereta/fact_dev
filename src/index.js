import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import SimpleTabs from "./header.js";
import Fact from "./form_fact.js";
function App() {
  return (
    <div>
      <SimpleTabs />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
