//ENTRYPOINT FOR THE PROGRAM THAT WILL BE BUNDLED INTO OUR MAIN WEBPAGE
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// Pages
import Homepage from "./pages/Homepage";
import AvadaKadevera from './pages/AvadaKadevera';
import Incindio from './pages/Incindio';
import Lumos from './pages/Lumos';
import Sandbox from './pages/Sandbox';
import WingardiumLeviosa from './pages/WingardiumLeviosa';
import ExpectoPatronum from './pages/ExpectoPatronum';
// Components
import Navigation from "./components/navbar";
import Footer from "./components/footer";
// Styling
import './styles/index.css';


function App() {
    return (
        <Router>
                <Navigation />
                    <Switch>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/avadakadevera" component={AvadaKadevera} />
                        <Route path="/incindio" component={Incindio} />
                        <Route path="/lumos" component={Lumos} />
                        <Route path="/sandbox" component={Sandbox} />
                        <Route path="/wingardiumleviosa" component={WingardiumLeviosa} />
                        <Route path="/expectopatronum" component={ExpectoPatronum} />
                    </Switch>
        </Router>
    );
}

export default App;
