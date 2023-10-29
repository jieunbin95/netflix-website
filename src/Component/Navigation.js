import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate=useNavigate()
  const [keywords,setKeyWords]=useState('')

  const searchMovie=(e)=>{
    e.preventDefault();
  }

  const movieList=(e)=>{
     setKeyWords(e.target.value)
     navigate(`/movies/?q=${keywords}`)
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick={()=>navigate('/')}><img 
        style={{width:'150px',cursor:'pointer'}}
        src='https://logohistory.net/wp-content/uploads/2023/05/Netflix-Logo.png'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          
          <Link to='/' className="nav-item">Home</Link>
          <Link to='/movies' className="nav-item">Movies</Link>
           
          </Nav>
          <Form className="d-flex" onSubmit={(e)=>searchMovie(e)} >
            <Form.Control
              onChange={(e)=>movieList(e)}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-danger">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
