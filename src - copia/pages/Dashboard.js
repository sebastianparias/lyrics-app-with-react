import { useNavigate, Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div>Dashboard</div>
      <button onClick={handleClick}>Logout</button>

      <Link to="welcome">link welcome</Link>
      <Link to="goodbye">link goodbye</Link>

      <Outlet />
    </>
  );
};

export default Dashboard;
