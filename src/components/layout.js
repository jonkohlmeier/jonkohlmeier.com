import React from "react";
import { Link } from "gatsby";

import Navigation from "../components/nav";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const heading = (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
      <span className="subtitle">from the pipe of Jon Kohlmeier</span>
    </h1>
  );

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <a className="skip-to-content" href="#main-content">
        Skip to main content
      </a>
      <header className="global-header" role="banner">
        {heading}
      </header>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer role="contentinfo">
        © {new Date().getFullYear()} Jon Kohlmeier
      </footer>
    </div>
  );
};

export default Layout;
