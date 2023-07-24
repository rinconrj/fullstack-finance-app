import { useSession } from "next-auth/react";
import CustomNavbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return (
    <>
      {session?.user && <CustomNavbar />}
      <main> {children} </main>
    </>
  );
}
