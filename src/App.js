import React, { Component, Fragment } from "react";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios"
import Search from "./components/users/Search";
import { Alert } from "./components/layout/Alert";
import { About } from "./components/pages/About";
import User from "./components/users/User";
class App extends Component {
 state={
   users:[],
   user:{},
   loading:false,
   alert:null
 }


  searchUsers=async (text)=>{
    this.setState({
      loading:true
    });
    const res= await axios.get("https://api.github.com/search/users?q="+text);
 this.setState({
   users:res.data.items,
  loading:false
});
  }

  //get a single github user

  getUser=async(username)=>{
    this.setState({
      loading:true
    });
    const res= await axios.get(`https://api.github.com/users/${username}`);
 this.setState({
   user:res.data,
  loading:false
});
  }

  clearUsers=()=>{
    this.setState({
      users:[],
      loading:false
    });
  }

  setAlert=(msg,type)=>{
    this.setState({
      alert:{
        msg,
        type
      }
    });

    setTimeout(() => {
      this.setState({
        alert:null
      });
    }, 5000);
  }

  render() {
    const {loading,users,alert}=this.state;

    return (
      <Router basename={'/githubfinder/'}>
        <div className="App">
        <Navbar title="Github Finder" />
        <div className="container">
          <Alert alert={alert} />
          <Switch> 
            <Route exact path="/" render={props=>(
              <Fragment>
                 <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length>0}
          setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
              </Fragment>
            )} />
 <Route exact path="/about" component={About}>
 
            </Route>
          </Switch>
        </div>
      </div>
      </Router>
      
    );
  }
}

export default App;
