import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./FoodMenu";
import Snack from "./FoodItem";

function App () {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ snacks, setSnacks ] = useState([]);
    const [ drinks, setDrinks ] = useState([]);

    useEffect(() => {
        async function getSnacks () {
            let menuItems = await SnackOrBoozeApi.getSnacks();
            let snacks = menuItems.filter(item => item.type === ("snacks"));
            let drinks = menuItems.filter(item => item.type === ("drinks"));
            setSnacks(snacks);
            setDrinks(drinks);
            setIsLoading(false);
        }
        getSnacks();
    }, []);


    if(isLoading) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <main>
                    <Switch>
                        <Route exact path="/">
                            <Home snacks={ snacks } />
                        </Route>

                        {/* snack routes */ }
                        <Route exact path="/snacks">
                            <Menu menuItems={ snacks } title="Snack" />
                        </Route>
                        <Route path="/snacks/:id">
                            <Snack items={ snacks } cantFind="/snacks" />
                        </Route>

                        {/* drink routes */ }
                        <Route exact path="/drinks">
                            <Menu menuItems={ drinks } title="Drink" />
                        </Route>
                        <Route path="/drinks/:id">
                            <Snack items={ drinks } cantFind="/drinks" />
                        </Route>
                        <Route>
                            <p>Hmmm. I can't seem to find what you want.</p>
                        </Route>
                    </Switch>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
