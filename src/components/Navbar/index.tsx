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
    <div className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
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
                "text-lg   text-[#565457] hover:text-[#353138]",
                isSelected ? "font-bold text-black" : ""
              )}
            >
              <a href={item.route} className="flex items-center">
                {item.title}
              </a>
            </Typography>
          );
        })}
      </div>
    </div>
  );

  return (
    <Navbar className="top-0  flex max-w-full justify-center rounded-none">
      <div className="container  flex items-center justify-center text-blue-gray-900">
        {navList}
      </div>
      <div className=" flex items-center justify-end">
        {status === "authenticated" && (
          <Button
            type="button"
            // variant="gradient"
            color="red"
            size="sm"
            onClick={() => signOut()}
            className="mr-4"
          >
            <Typography className="text-white">Sign Out</Typography>
          </Button>
        )}
      </div>
    </Navbar>
  );
}
