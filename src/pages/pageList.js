export const Landing = () => <h2>Landing page (public)</h2>; //Pagina publica

export const Home = () => {
  return <h2>Home page (private)</h2>;
};

export const Dashboard = () => <h2>Dashboard page (private)</h2>;

export const Analytics = () => (
  <h2>Analytics page (private, permission: 'analyze')</h2>
);

export const Admin = () => <h2>Admin page (private, permission: 'admin')</h2>;
