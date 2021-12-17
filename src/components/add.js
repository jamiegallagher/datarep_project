import React from "react";
import axios from "axios";
export class Add extends React.Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRelease = this.onChangeRelease.bind(this);
        this.onChangeCover = this.onChangeCover.bind(this);
        this.state = {
            Name: '',
            Release: '',
            Cover: ''
        }
    }
    onChangeName(arg) {
        this.setState({
            Name: arg.target.value
        });
    }

    onChangeRelease(arg) {
        this.setState({
            Release: arg.target.value
        });
    }

    onChangeCover(arg) {
        this.setState({
            Cover: arg.target.value
        })
    }

    onSubmit(arg) {
        arg.preventDefault();
        alert("Videogame: " + this.state.Name + " " + this.state.Release + " " + this.state.Cover);

        const newGame = {
            name: this.state.Name,
            release: this.state.Release,
            cover: this.state.Cover
        }
        axios.post("http://localhost:5000/api/videogames", newGame)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Videogame Name: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Name}
                            onChange={this.onChangeName}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Videogame Release Year: </label>
                        <input type="text"
                            className='form-control'
                            value={this.state.Release}
                            onChange={this.onChangeRelease}></input>
                    </div>
                    <div className="form-group">
                        <label>Videogame Cover: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Cover}
                            onChange={this.onChangeCover}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <input type='submit'
                            value='Add Videogame'
                            className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        )
    }
}