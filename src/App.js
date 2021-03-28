//ENTRYPOINT FOR THE PROGRAM THAT WILL BE BUNDLED INTO OUR MAIN WEBPAGE
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// Pages
import Homepage from "./pages/Homepage";
// Components
import Navigation from "./components/navbar";
import Footer from "./components/footer";
// Styling
import './styles/index.css'

function App() {
    return (
        <Router>
            <Navigation />
            <Switch>
                <Route path="/" exact component={Homepage} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
