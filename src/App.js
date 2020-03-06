import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import { Alert } from "./components/layout/Alert";
import { About } from "./components/pages/About";
import User from "./components/users/User";
import GithubState from "./context/github/GithubState";

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      alert: {
        msg,
        type
      }
    });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      setAlert={setAlert}
                    />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About}></Route>

              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                  />
                )}
              />
              <Route exact path='/about' component={About}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
