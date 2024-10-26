import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let local = localStorage.getItem('isAdmin')
  return local == 'true' ? <Outlet /> : <Navigate to="/customer" />;
};
export default PrivateRoutes;