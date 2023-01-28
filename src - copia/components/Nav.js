import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="/users"
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="/about"
          >
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
