import React from 'react';

const navStyle = {
    fontFamily: 'Roboto',
    width: 100,
    float: 'right',
    margin: '0 0 3em 0',
    padding: 0,
    listStyle: 'none',
    backgroundColor: '#f2f2f2',
    borderBottom: '1px solid #ccc',
    borderTop: '1px solid #ccc',
}

const liStyle = {
    fontFamily: 'Roboto',
    display: 'block',
    padding: '8px 15px',
    fontWeight: 'bold',
    borderTight: '1px solid #ccc'
}

const aStyle = {
    color: '#069',
    textDecoration: 'none'
}

class Navbar extends React.Component{
    render() {
        return (
            <div>
              <ul style={navStyle}>
              <li style={liStyle}>Mapping Chinese Surnames</li>
                <li style={liStyle}><a href="#" style={aStyle}>Home</a></li>
                <li style={liStyle}><a href="#" style={aStyle}>About</a></li>
                <li style={liStyle}><a href="#" style={aStyle}>Map</a></li>
                <li style={liStyle}><a href="#" style={aStyle}>See Data</a></li>
              </ul>
            </div>
        );
    }
}

export default Navbar;

// import React from 'react';
// import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
// import styled from 'styled-components';
// const Styles = styled.div`
//   .navbar { background-color: #222; }
//   a, .navbar-nav, .navbar-light .nav-link {
//     color: #9FFFCB;
//     &:hover { color: white; }
//   }
//   .navbar-brand {
//     font-size: 1.4em;
//     color: #9FFFCB;
//     &:hover { color: white; }
//   }
//   .form-center {
//     position: absolute !important;
//     left: 25%;
//     right: 25%;
//   }
// `;
// export const NavigationBar = () => (
//   <Styles>
//     <Navbar expand="lg">
//       <Navbar.Brand href="/">Tutorial</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav"/>
//       <Form className="form-center">
//         <FormControl type="text" placeholder="Search" className="" />
//       </Form>
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ml-auto">
//           <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
//           <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   </Styles>
// )
