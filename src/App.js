import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios"
import Search from "./components/users/Search";
class App extends Component {
 state={
   users:[],
   loading:false
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

  clearUsers=()=>{
    this.setState({
      users:[],
      loading:false
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" />
        <div className="container">
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length>0} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
