import { NavLink, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import network from "../util/network";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Badge from "./Badge";
import {
  IconHeartFilled,
  IconHomeFilled,
  IconLayoutGridFilled,
  IconLogout2,
  IconUserFilled,
} from "@tabler/icons-react";

const getMe = () => {
  return network.get("/auth/me");
};

const logout = () => {
  return network.post("/auth/signout");
};

const menu = [
  { id: 1, name: "Home", path: "/", icon: IconHomeFilled },
  { id: 2, name: "About", path: "/about", icon: IconLayoutGridFilled },
  { id: 3, name: "Favourites", path: "/favourites", icon: IconHeartFilled },
];

const adminMenu = [
  { id: 1, name: "Users", path: "/admin/users", icon: IconUserFilled },
];

const Navbar = () => {
  const theme = useMantineTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/signin");
    },
    onError: (data: Error) => {
      if (data instanceof AxiosError) toast.error(data.response?.data.message);
      else toast.error(data.message);
    },
  });

  return (
    <nav className="relative p-5 bg-[#00000000] flex justify-end gap-3">
      {meQuery.data?.data.data.credits !== undefined && (
        <div className="flex flex-col items-center justify-center">
          <Badge className="max-h-[30px]">
            {meQuery.data?.data.data.credits} 🪙
          </Badge>
        </div>
      )}
      <div
        className="lg:hidden flex flex-col gap-2 cursor-pointer mt-0.5"
        onClick={toggleMenu}
      >
        <div
          className={`w-6 h-0.5 bg-white transition-all duration-300 transform ${
            isMenuOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white transition-all duration-300 transform ${
            isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        />
      </div>

      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden fixed top-0 left-0 w-64 text-white h-full transition-transform duration-300 ease-in-out z-50`}
        style={{
          backgroundColor: theme.colors.gray[8],
        }}
      >
        <div className="p-5">
          {menu.map((item) => (
            <NavLink
              key={item.id}
              onClick={() => {
                toggleMenu();
                navigate(item.path);
              }}
              label={item.name}
              leftSection={<item.icon size={14} />}
            />
          ))}
          {meQuery.data?.data.data.role === "ADMIN" &&
            adminMenu.map((item) => (
              <NavLink
                key={item.id}
                onClick={() => {
                  toggleMenu();
                  navigate(item.path);
                }}
                label={item.name}
                leftSection={<item.icon size={20} />}
              />
            ))}
          <NavLink
            onClick={() => {
              toggleMenu();
              logoutMutation.mutate();
            }}
            label="Logout"
            leftSection={<IconLogout2 size={20} />}
          />
        </div>
      </div>

      <div
        className="hidden lg:flex gap-5 flex-col absolute left-[30px] top-[70px] p-5"
        style={{
          backgroundColor: theme.colors.gray[8],
        }}
      >
        {menu.map((item) => (
          <NavLink
            key={item.id}
            onClick={() => {
              toggleMenu();
              navigate(item.path);
            }}
            label={item.name}
            active={location.pathname === item.path}
            leftSection={<item.icon size={20} />}
          />
        ))}
        {meQuery.data?.data.data.role === "ADMIN" &&
          adminMenu.map((item) => (
            <NavLink
              key={item.id}
              onClick={() => {
                toggleMenu();
                navigate(item.path);
              }}
              label={item.name}
              active={location.pathname === item.path}
              leftSection={<item.icon size={20} />}
            />
          ))}
        <NavLink
          onClick={() => {
            toggleMenu();
            logoutMutation.mutate();
          }}
          label="Logout"
          leftSection={<IconLogout2 size={20} />}
        />
      </div>
    </nav>
  );
};

export default Navbar;
