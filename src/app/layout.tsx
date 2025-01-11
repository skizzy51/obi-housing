import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import TopNavbar from "../components/TopNavbar"
import { ReduxProvider } from "@/redux/ReduxProvider"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import Sidebar from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Obi Housing",
    description: "Housing in Nigeria made EASY!",
    // icons: "/public/logo.png",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true} className={inter.className}>
                <main>
                    <ReduxProvider>
                        <ToastContainer />
                        <TopNavbar />
                        <div className="flex">
                            <Sidebar />
                            {children}
                        </div>
                    </ReduxProvider>
                </main>
            </body>
        </html>
    )
}
