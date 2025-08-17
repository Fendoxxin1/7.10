import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import DarkModeToggle from "./components/DarkModeToggle";
import useOnlineStatus from "./hooks/useOnlineStatus";

export default function App() {
  const isOnline = useOnlineStatus();

  return (
    <div className="container">
      {!isOnline && <div className="banner">You are offline</div>}
      <div className="header">
        <div className="nav">
          <NavLink to="/" className="link">
            Home
          </NavLink>
          <NavLink to="/register" className="link">
            Register
          </NavLink>
        </div>
        <DarkModeToggle />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
