import React, {useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import theme from "./theme/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "react-router-dom"
import Footer from "./components/Footer/Footer";
import {makeStyles} from "@material-ui/styles";

function App() {
    let [value, setValue] = useState(-1);
    let [selectedTabOption, setSelectedTabOption] = useState(-1);
    let [selectedDrawerOption, setSelectedDrawerOption] = useState(-1);

    let useStyles = makeStyles({
        header : {
            background : "linear-gradient(49deg," + theme.palette.primary.main + " 0%, " + theme.palette.primary.light + " 100%)"
        }
    });
    let classes = useStyles();
  return (
    <div className="App">
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Header className={classes.header}
                        value={value} setValue={setValue}
                        selectedTabOption={selectedTabOption} setSelectedTabOption={setSelectedTabOption}
                        selectedDrawerOption={selectedDrawerOption} setSelectedDrawerOption={setSelectedDrawerOption}
                />
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
                <Footer
                    value={value} setValue={setValue}
                    selectedTabOption={selectedTabOption} setSelectedTabOption={setSelectedTabOption}
                    selectedDrawerOption={selectedDrawerOption} setSelectedDrawerOption={setSelectedDrawerOption}
                />
            </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
