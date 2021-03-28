import React from "react";
import ReactDOM from "react-dom";
import Card from "./components/Card.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class Homepage extends React.Component{
    render(){
        return(
            <div>
               <Card /> 
            </div>
        )}
}
