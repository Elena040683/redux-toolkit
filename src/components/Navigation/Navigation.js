import { NavLink } from "react-router-dom";
import s from './Navigation.module.css';

export function Navigation() {
  return (
    <>
       <nav>
        <ul className={s.navList}>
          <li>
            <NavLink exact 
              to="/" 
              className="navLink" 
              activeClassName="activeNavLink"
            >
                Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/pexels" 
              className="navLink" 
              activeClassName="activeNavLink"
            >
                Pexels
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products" 
              className="navLink" 
              activeClassName="activeNavLink"
            >
                Products</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )

}