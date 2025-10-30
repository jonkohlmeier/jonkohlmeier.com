import React from "react";
import { Link } from "gatsby";
import { Nav, Navbar, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg="dark"
      variant="dark"
      role="navigation"
      aria-label="Main navigation"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Puffs of Smoke
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-navigation" />
        <Navbar.Collapse id="primary-navigation">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link
              href="https://twistoflemonpod.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Podcast ↗
            </Nav.Link>
            <Nav.Link
              href="https://www.instagram.com/jon.kohlmeier/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </Nav.Link>
            <Nav.Link
              href="https://linkedin.com/in/jonkohlmeier"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
