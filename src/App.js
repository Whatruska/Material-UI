import React from 'react';
import './App.css';
import Header from "./components/Header";
import theme from "./theme/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import btnStyle from "./styles/btn-style";
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "react-router-dom"

function App() {
    let classes = btnStyle();
  return (
    <div className="App">
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Header className={classes.header} theme={theme}/>
                <Switch>
                    <Route exact path={"/"} component={() => <div>Home</div>}/>;
                    <Route exact path={"/services"} component={() => <div>Services</div>}/>;
                    <Route exact path={"/web"} component={() => <div>Web-site</div>}/>;
                    <Route exact path={"/desktop"} component={() => <div>Desktop</div>}/>;
                    <Route exact path={"/mobile"} component={() => <div>Mobile</div>}/>;
                    <Route exact path={"/about"} component={() => <div>About us</div>}/>;
                    <Route exact path={"/revolution"} component={() => <div>Revolution</div>}/>;
                    <Route exact path={"/contacts"} component={() => <div>Contacts</div>}/>;
                    <Route exact path={"/estimate"} component={() => <div>Free Estimate</div>}/>;
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
