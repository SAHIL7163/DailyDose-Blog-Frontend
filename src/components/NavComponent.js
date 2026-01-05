import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { FaLaptop, FaMobileAlt, FaTabletAlt, FaSearch } from "react-icons/fa";
import logo from "./../img/dailydoseblog-high-resolution-logo (3).jpg";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const NavComponent = ({ search, setSearch, width }) => {
  const [expanded, setExpanded] = useState(false);
  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavLinkClick = () => {
    // Close the Navbar when a navigation link is clicked
    setExpanded(false);
  };

  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const handlelogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="fixed-top header-nav"
      padding="0px !important"
    >
      <div className="d-flex justify-content-between align-items-center w-100">
        <div>
          <Navbar.Brand className="navbar-brand-custom">
            <img src={logo} className="nav-logo" alt="" />
          </Navbar.Brand>
        </div>
        <div className="justify-content-end me-3">
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleNavbarToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
        </div>
      </div>
      <div
        className="position-relative d-flex justify-content-start mx-3 mx-md-auto my-2 w-100 "
        style={{
          maxWidth: width < 768 ? "100%" : width < 992 ? "300px" : "400px",
        }}
      >
        <FaSearch className="position-absolute top-50 translate-middle-y ms-2 text-muted" />

        <input
          id="search"
          type="text"
          placeholder="Search Blogs"
          className="form-control fs-5 ps-5 w-100"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="navbar-custom"
        in={expanded}
      >
        <Nav className="nav-custom">
          <Nav.Link
            className="text-center  nav-link-custom"
            as={NavLink}
            to="/"
            activeClassName="active-link"
            onClick={handleNavLinkClick}
          >
            <span className="nav-custom-span"> Home</span>
          </Nav.Link>
          <Nav.Link
            className="text-center nav-link-custom"
            as={NavLink}
            to="/post"
            activeClassName="active-link"
            onClick={handleNavLinkClick}
          >
            <span className="nav-custom-span">Post</span>
          </Nav.Link>
          {!auth?.accessToken ? (
            <Nav.Link
              className="text-center nav-link-custom"
              as={NavLink}
              to="/login"
              activeClassName="active-link"
              onClick={handleNavLinkClick}
            >
              <span className="nav-custom-span">Login</span>{" "}
            </Nav.Link>
          ) : (
            <Nav.Link
              className="text-center nav-link-custom"
              as={NavLink}
              activeClassName="active-link"
              onClick={handlelogout}
            >
              <span className="nav-custom-span">Logout</span>{" "}
            </Nav.Link>
          )}
          <Nav.Link
            className="text-center nav-link-custom"
            as={NavLink}
            to="/register"
            activeClassName="active-link"
            onClick={handleNavLinkClick}
          >
            <span className="nav-custom-span"> Register</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavComponent;
