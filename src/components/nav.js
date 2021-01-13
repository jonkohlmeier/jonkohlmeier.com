import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import { Nav, Navbar } from "react-bootstrap"

const Navigation = () => {
    return (
        <Navbar className="justify-content-end" sticky="top" bg="dark" variant="dark">
            <Nav className="justify-content-end">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="https://twistoflemonpod.com" target="_blank">Podcast &#x2192;</Nav.Link>
                <Nav.Link href="https://instagram.com/jonkohlmeier" target="_blank">Instagram &#x2192;</Nav.Link>
                <Nav.Link href="https://linkedin.com/in/jonkohlmeier" target="_blank">LinkedIn &#x2192;</Nav.Link>
            </Nav>
  </Navbar>
    )
}

export default Navigation

