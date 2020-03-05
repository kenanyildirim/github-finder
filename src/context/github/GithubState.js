import React,{useReducer} from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import Axios from 'axios';
import { SET_LOADING, SEARCH_USERS, CLEAR_USERS, GET_USER, GET_USER_REPOS } from '../types';
const GithubState=props=>{
    const initialState={
        users:[],
        user:{},
        repos:[],
        loading:false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //search user
    const searchUsers = async text => {
        setLoading();
        const res = await Axios.get(
          "https://api.github.com/search/users?q=" + text
        );
        dispatch({
            type:SEARCH_USERS,
            payload:res.data.items
        });
      };
    //get user

    
  const getUser = async username => {
    setLoading();
    const res = await Axios.get(`https://api.github.com/users/${username}`);
    dispatch({
        type:GET_USER,
        payload:res.data
    });
  };

    //get repos
  const getUserRepos = async username => {
    setLoading();
    const res = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    dispatch({
        type:GET_USER_REPOS,
        payload:res.data
    });
  };

    //clear users
    const clearUsers = () => {
        dispatch({
            type:CLEAR_USERS
        });
      };
    //set loading

    const setLoading=()=>{
        dispatch({
            type:SET_LOADING
        });
    }


    return <GithubContext.Provider
            value={{
                    users:state.users,
                    user:state.user,
                    repos:state.repos,
                    loading:state.loading,
                    searchUsers:searchUsers,
                    clearUsers:clearUsers,
                    getUser:getUser,
                    getUserRepos:getUserRepos
                }}>
            {props.children}
        </GithubContext.Provider>

}

export default GithubState;