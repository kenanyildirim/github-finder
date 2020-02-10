import React, { Component } from 'react'

export class Search extends Component {
    state={
        text:''
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    onSubmit=(e)=>{
        e.preventDefault();
        if(this.state.text===''){
            this.props.setAlert('Please enter something','light');
            return;
        }
       this.props.searchUsers(this.state.text);
       this.setState({
           text:''
       });
    }

    render() {
        const {showClear,clearUsers}=this.props;
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input onChange={this.onChange} value={this.state.text} type="text" name="text" placeholder="Search Users..." />
                    <input  type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {
                    showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
                }
                
            </div>
        )
    }
}

export default Search
