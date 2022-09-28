import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Header.css'
export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Blazap
      </Link>
      <ul>
        <a href={process.env.REACT_APP_DOWNLOADS_REDIRECT}>Downloads</a>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}