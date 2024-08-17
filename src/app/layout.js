import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from "@/context/ThemeContext";
import { getServerSession } from "next-auth";
import AuthProvider from "@/lib/SessionProvider";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Maps",
    description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
    const session = await getServerSession();

    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider session={session}>
                    <ThemeContextProvider>
                        <CssBaseline />
                        <div style={{ minHeight: "100vh", padding: "1rem 0", backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)" }}>
                            <Navbar />
                            {children}
                            <div style={{ zIndex: 10, position: "relative" }}>
                                <Footer />
                            </div>
                        </div>
                    </ThemeContextProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
