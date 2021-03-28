import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./Homepage";
import "./styles/style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(<Homepage />, document.getElementById('root'));