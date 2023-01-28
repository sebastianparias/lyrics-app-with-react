import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Admin, Analytics, Dashboard, Home, Landing } from "./pages/pageList";
import { useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState(null);

  const login = () => {
    //request done
    setUser({
      id: 1,
      name: "Sebas",
      permissions: ["analyze"],
      rols: ["admin"]
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Navigation />

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}

      <Routes>
        <Route index element={<Landing />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>

        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permissions.includes("analyze")}
              redirectTo="/home"
            >
              <Analytics />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.rols.includes("admin")}
              redirectTo="/home"
            >
              <Admin />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/landing">landing</Link>
        </li>
        <li>
          <Link to="/home">home</Link>
        </li>
        <li>
          <Link to="/dashboard">dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">analytics</Link>
        </li>
        <li>
          <Link to="/admin">admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
