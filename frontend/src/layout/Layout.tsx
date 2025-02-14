import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='bg-gray-800 min-h-screen'>
      <Outlet />
    </div>
  );
};
export default Layout;
