import React from 'react'
import ReactDOM from 'react-dom'


const SpellPage = () => {
    return(
        <div>
            <h1>{this.props.spellName}</h1>
            <canvas id="spellCanvas"></canvas>
        </div>
    )
}