import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header


    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link> <span className="subtitle">from the pipe of Jon Kohlmeier</span>
      </h1>
  
    )
  

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Jon Kohlmeier
        {` `}
      </footer>
    </div>
  )
}

export default Layout
