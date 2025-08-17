import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import useOnlineStatus from "./hooks/useOnlineStatus";

export default function App() {
  const isOnline = useOnlineStatus();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {!isOnline && (
        <div className="bg-red-500 text-white text-center py-2 font-semibold">
          You are offline
        </div>
      )}

      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <nav className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-100"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-100"
              }`
            }
          >
            Register
          </NavLink>
        </nav>
      </header>

      <main className="px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}
