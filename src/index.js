import React from "react";
import ReactDOM from "react-dom";
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
                <h1>Hello World!</h1>
                <div className="card">
                    <img></img>
                    <h1>Magic Spell Name</h1>
                    <p>Description for magic spell</p>
                </div>
            </div>
        )}
}

ReactDOM.render(<Homepage />, document.getElementById('root'));