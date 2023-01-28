import {Link} from 'react-router-dom'

const userId = 10

const Home = () => {
  return (
    <div>
      <h1>App</h1>
      <Link to={`/users/${userId}`}>Usuario 10</Link>
    </div>
  );
};

export default Home;
