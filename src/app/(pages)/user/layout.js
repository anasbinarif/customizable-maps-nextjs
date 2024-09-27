import {Inter} from "next/font/google";
// import { ThemeProvider } from "@/context/ThemeContext";
import {getServerSession} from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Maps",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <>
      {/* <Navbar /> */}
      {children}
      <div style={{ zIndex: 10, position: "relative" }}>{/* <Footer /> */}</div>
    </>
  );
}
