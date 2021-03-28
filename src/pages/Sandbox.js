import React from 'react';
function playPatronus() {
    
    var audio = new Audio('../assets/PatronusSound.wav');
    audio.play();
  }
  function playOpen() {
    
    var audio = new Audio('../assets/complete.wav');
    audio.play();
  }
  function playNice() {
    
    var audio = new Audio('../assets/nice.wav');
    audio.play();
  }
const Sandbox = () => {
    return (
        <div>
            <h1>Sandbox</h1>
        </div>
    );
};

export default Sandbox;
