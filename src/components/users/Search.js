import React, { Component,useState } from 'react'

 const Search= ({searchUsers,showClear,clearUsers,setAlert}) => {
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
       searchUsers(text);
      setText("");
    }
        return (
            <div>
                <form className="form" onSubmit={onSubmit}>
                    <input onChange={onChange} value={text} type="text" name="text" placeholder="Search Users..." />
                    <input  type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {
                    showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
                }
                
            </div>
        )
  
}

export default Search
