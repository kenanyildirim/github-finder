import React, { Component,useState,useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

 const Search= ({setAlert}) => {
     const githubContext=useContext(GithubContext);
   const [text, setText] = useState("")

    const onChange=(e)=>{
        setText(e.target.value);
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        if(text===''){
            setAlert('Please enter something','light');
            return;
        }
      githubContext.searchUsers(text);
      setText("");
    }
        return (
            <div>
                <form className="form" onSubmit={onSubmit}>
                    <input onChange={onChange} value={text} type="text" name="text" placeholder="Search Users..." />
                    <input  type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {
                    githubContext.users.length>0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>
                }
                
            </div>
        )
  
}

export default Search
