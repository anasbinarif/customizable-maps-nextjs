import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from "@/context/ThemeContext";
import { getServerSession } from "next-auth";
import AuthProvider from "@/lib/SessionProvider";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Maps",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundImage: "var(--primary-bg)" }}
      >
        <AuthProvider session={session}>
          <ThemeContextProvider>
            <CssBaseline />
            <Navbar />
            <div
              style={{
                minHeight: "100vh",
                padding: "1rem 0",
                // backgroundColor: "red",
                // backgroundImage: "primary.main.pageBg1",
                position: "relative",
              }}
            >
              {children}
              <DarkModeToggle />
            </div>
            <Footer />
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
