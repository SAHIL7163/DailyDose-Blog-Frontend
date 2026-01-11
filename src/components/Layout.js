import React from "react";
import NavComponent from "./NavComponent";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ search, setSearch }) => {
  return (
    <>
      <NavComponent search={search} setSearch={setSearch} />
      <main className="main-content container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
