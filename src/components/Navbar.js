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
        <Link to="/favorites" className="site-title">
          <a class="send">Favorites</a>
        </Link>
        <Link to="/send" className="site-title">
          <a class="send">Send App</a>
        </Link>
      </ul>
    </nav>
  )
}

