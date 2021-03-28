import React from 'react';
import ReactDOM from 'react-dom';

export default class Card extends React.Component{
    render(){
        return(
                <div className="card">
                    <img src={`${this.props.imageURL}`}></img>
                    <h1>{this.props.spell}</h1>
                    <p>{this.props.description}</p>
                </div>
        )
    }
}