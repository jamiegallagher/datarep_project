import React from "react";
import { Videogames } from "./videogames";
import axios from 'axios';

export class List extends  React.Component
{
    constructor()
    {
        super();
        
        this.ReloadData = this.ReloadData.bind(this);
    }
    state = {
        videogames: []
    };

    componentDidMount()
    {
        axios.get('http://localhost:5000/api/videogames')
        .then((res)=>{
            this.setState({videogames:res.data})
        })
        .catch((err)=>{
            console.log(err)
        });
    }
   ReloadData()
    {
        axios.get('http://localhost:5000/api/videogames')
        .then((response)=>{
            this.setState({ videogames:response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    render()
    {
        return(
            <div>
                <h1>Video Game List</h1>
                <Videogames videogames={this.state.videogames} ReloadData={this.ReloadData}></Videogames>
            </div>
        )
    }
}