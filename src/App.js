import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { Title } from './components/title';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { List } from './components/list';
import { Add } from './components/add';
class App extends  Component {
  render() {
    return (
      <Router>
      <div className='App'>

<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/list">List</Nav.Link>
      <Nav.Link href="/add">Add</Nav.Link>
    </Nav>
  </Navbar>
  <br>
  </br>
  <Routes>
    <Route path='/' element={<Title />} exact/>
    <Route path='/list' element={<List />} exact/>
    <Route path='/add' element={<Add />} exact/>
  </Routes>
      </div>
      </Router>
    );
  }
}

export default App;
