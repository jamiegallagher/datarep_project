import React from "react";
import { VideogameSelection } from "./videogameselection";

export class Videogames extends  React.Component
{
    render()
    {
        return this.props.videogames.map( (videogame)=>{
             return <VideogameSelection videogame={videogame} ReloadData={this.props.ReloadData}></VideogameSelection>
        })
    }
}