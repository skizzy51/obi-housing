"use client"
import Image from "next/image"
import logo from "../images/obi-housing-logo.svg"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

export default function TopNavbar() {
    const pathname = usePathname()
    const router = useRouter()

    if (
        pathname === "/sign-in" ||
        pathname === "/dashboard" ||
        pathname === "/agent-profile" ||
        pathname === "/agents" ||
        pathname === "/properties" ||
        pathname === "/become-an-agent" ||
        pathname === "/sell" ||
        pathname === "/sell/listing/sell" ||
        pathname === "/sell/listing/rent" ||
        pathname.split("/")[1] === "property"
    ) {
        return null
    } else
        return (
            <div className="fixed z-30 top-0 left-0 w-screen h-[5rem] bg-white flex justify-center">
                <div className="w-[85%] h-full py-4 flex justify-between items-center">
                    <Image
                        className="flex-shrink-0 w-[3.5rem]"
                        src={logo}
                        alt="Logo"
                    />

                    <div className="w-[40%] flex justify-between items-center flex-shrink-0">
                        <Link
                            href={{ pathname: "/properties" }}
                            className="text-sm text-gray-500"
                        >
                            Buy
                        </Link>
                        <Link
                            href={{ pathname: "/sell" }}
                            className="text-sm text-gray-500"
                        >
                            Sell
                        </Link>
                        <Link
                            href={{ pathname: "/become-an-agent" }}
                            className="text-sm text-gray-500"
                        >
                            Become an Agent
                        </Link>
                        <span className="text-sm text-gray-500">Contact</span>
                    </div>

                    <Link
                        href={{ pathname: "/sign-in" }}
                        className="bg-defaultBlue flex-shrink-0 text-white py-2.5 px-6 rounded-md text-sm"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        )
}
