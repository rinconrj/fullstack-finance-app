import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import CustomNavbar from "~/components/Navbar"

import { ThemeProvider } from "@material-tailwind/react";
import "~/styles/globals.css";
import { User } from "@prisma/client";

interface UserSession extends Session {
  user: User;
}

const MyApp: AppType<{ session: UserSession | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
      <CustomNavbar/>
      <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
