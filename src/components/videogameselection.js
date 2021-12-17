import React from "react";
import Card from 'react-bootstrap/Card'
import axios from "axios";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
export class VideogameSelection extends React.Component {

     constructor() {
         super();

         this.DeleteVideoGame = this.DeleteVideoGame.bind(this);
 }

     DeleteVideoGame(arg) {
         arg.preventDefault();
         console.log("Delete:" + this.props.videogame._id);

         axios.delete("http://localhost:5000/api/videogames/" + this.props.videogame._id)
             .then(() => {
                 this.props.ReloadData();
             })
             .catch();
     }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.videogame.name}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.videogame.cover} width="200" height="200"></img>
                            <footer className="blockquote-footer">
                                {this.props.videogame.release}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Button variant="danger" onClick={this.DeleteVideoGame}>Delete</Button>
                </Card>
            </div>
        )
    }
}