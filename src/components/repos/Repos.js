import React,{useContext} from 'react'
import { RepoItem } from './RepoItem'
import GithubContext from '../../context/github/githubContext'

export const Repos = () => {
    const githubContext = useContext(GithubContext)
    return (
      githubContext.repos.map(repo=>{
           return <RepoItem repo={repo} /> 
       })
    )
}
