import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Header.css'
export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <img src="https://raw.githubusercontent.com/blazap/blazap-db/main/color.png" />
        Blazap
      </Link>
      <ul>
        <Link to="/share" className="site-title">
          <a class="share">Send App</a>
        </Link>
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