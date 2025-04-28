import { Route, Routes, useLocation } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Favourites from "./pages/Favourites";
import About from "./pages/About";
import Users from "./pages/Users";
import User from "./pages/User";

const headLess = [
  {
    path: "/signin",
    component: <SignIn />,
  },
  {
    path: "/signup",
    component: <SignUp />,
  },
];

const AppRoutes = () => {
  const location = useLocation();
  const shouldShowNavbar = !headLess.some(
    (route) => route.path === location.pathname,
  );
  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/user/:id" element={<User />} />
        {headLess.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  );
};

export default AppRoutes;
