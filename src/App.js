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
const App=()=> {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);
  

  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(
      "https://api.github.com/search/users?q=" + text
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  //get a single github user

  const getUser = async username => {
   setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
  };

  //get users repos
  const getUserRepos = async username => {
   setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
   setUsers([]);
   setLoading(false);
  };

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
      <Router basename={"/githubfinder/"}>
        <div className="App">
          <Navbar title="Github Finder" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0}
                      setAlert={setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About}></Route>

              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    repos={repos}
                    user={user}
                    loading={loading}
                  />
                )}
              />
              <Route exact path="/about" component={About}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  
}

export default App;
