import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Framework</h1>
        </Link>
        <Link to="/">
          <h1>Methodology</h1>
        </Link>
      
        <Link to="/Cadreanalyse">
          <h1>Cadre d'analyse</h1>
        </Link>
        <Link to="/Role">
          <h1>Role et artefact</h1>
        </Link>
        <Link to="/Ressources">
          <h1>Users</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
