import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Collapse } from "@mui/material";
import classNames from "classnames";

const navItems = [
  {
    route: "/",
    title: "Home",
  },
  {
    route: "/dashboard",
    title: "Dashboard",
  },
  {
    route: "/accounts",
    title: "Accounts",
  },
  {
    route: "/creditcard",
    title: "Credit Cards",
  },
  {
    route: "/spends",
    title: "Spends",
  },
  {
    route: "/credits",
    title: "Credits",
  },
  {
    route: "/transactions",
    title: "Transactions",
  },
];

export default function CustomNavbar() {
  const { status } = useSession();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <div className="mb-4 mt-2 flex w-full flex-col justify-between gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <div className="flex items-center gap-6">
        {navItems.map((item) => {
          const isSelected =
            item.route === "/"
              ? window.location.pathname === item.route
              : window.location.pathname.includes(item.route);
          return (
            <Typography
              key={item.title}
              as="li"
              variant="small"
              color="blue-gray"
              className={classNames(
                "text-lg font-bold leading-[28px] text-[#565457] hover:text-[#353138]",
                isSelected ? "text-black" : ""
              )}
            >
              <a href={item.route} className="flex items-center">
                {item.title}
              </a>
            </Typography>
          );
        })}
      </div>
      <div className=" flex items-center justify-end">
        {status === "authenticated" && (
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded bg-red-500 px-3 py-2 text-center  text-sm font-medium"
          >
            <Typography className="text-white">Sign Out</Typography>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <Navbar className="max-w-screen-xl mx-auto px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex w-full items-center justify-between text-blue-gray-900">
        {navList}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
    </Navbar>
  );
}
