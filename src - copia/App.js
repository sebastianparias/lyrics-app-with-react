import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../src - copia/components/Nav";
import About from "../src - copia/pages/About";
import Dashboard from "../src - copia/pages/Dashboard";
// import Error from "./pages/Error";
import Home from "../src - copia/pages/Home";
import User from "../src - copia/pages/User";
import Users from "../src - copia/pages/Users";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/users" element={<Users />} />

        <Route path="/users/:id" element={<User />} />

        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="welcome" element={<p>Welcome subroute</p>}></Route>
          <Route path="goodbye" element={<p>goodbye subroute</p>}></Route>
        </Route>

        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </Router>
  );
};

export default App;
