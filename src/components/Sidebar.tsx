"use client"
import Image from "next/image"
import logo from "../images/obi-housing-logo.svg"
import { FaChevronLeft, FaChevronRight, FaRegUserCircle } from "react-icons/fa"
import { MdDashboard, MdOutlineTransferWithinAStation } from "react-icons/md"
import { BsHouseExclamationFill } from "react-icons/bs"
import { FaMoneyBill1Wave, FaUser } from "react-icons/fa6"
import { TiMessages } from "react-icons/ti"
import { TbLogout2 } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { toggleSidebar } from "@/redux/reducer"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Sidebar() {
    const { data: session, status } = useSession()
    const { sidebarOpen } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const pathname = usePathname()

    if (
        pathname === "/" ||
        pathname === "/properties" ||
        pathname === "/become-an-agent" ||
        pathname === "/sell" ||
        pathname === "/sign-in" ||
        status === "unauthenticated"
    ) {
        return null
    } else {
        return (
            <div
                className={`${
                    sidebarOpen ? "w-[15vw]" : "w-[4rem] items-center"
                } h-screen flex flex-col gap-y-7 py-5 px-3 relative flex-shrink-0 bg-white`}
            >
                <div className="flex justify-between items-center">
                    <Image
                        src={logo}
                        className={`${
                            sidebarOpen ? "w-[3.5rem]" : "w-full"
                        } max-w-none flex-shrink-0`}
                        alt="Logo"
                    />
                    <button
                        onClick={() => dispatch(toggleSidebar())}
                        className={`${
                            sidebarOpen
                                ? "bg-defaultBlueBackground"
                                : "absolute z-30 left-[100%] top-[5%] bg-white border border-black/20"
                        } p-1.5 rounded-full`}
                    >
                        {sidebarOpen ? (
                            <FaChevronLeft className="text-defaultBlue" />
                        ) : (
                            <FaChevronRight className="text-defaultBlue" />
                        )}
                    </button>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col gap-y-5">
                        <Link
                            href={{ pathname: "/dashboard" }}
                            className={`${sidebarOpen ? "px-5" : "px-3"} ${
                                pathname === "/dashboard"
                                    ? "bg-defaultBlue text-white"
                                    : "text-blue-900 hover:bg-defaultBlue hover:text-white"
                            } flex rounded-md py-3 items-center gap-x-3`}
                        >
                            <MdDashboard className="flex-shrink-0 transition-none" />
                            {sidebarOpen && (
                                <span className="text-sm font-medium truncate">
                                    Dashboard
                                </span>
                            )}
                        </Link>

                        <Link
                            href={{ pathname: "/properties" }}
                            className={`${sidebarOpen ? "px-5" : "px-3"} ${
                                pathname === "/properties"
                                    ? "bg-defaultBlue text-white"
                                    : "text-blue-900 hover:bg-defaultBlue hover:text-white"
                            } flex text-blue-900 hover:bg-defaultBlue hover:text-white rounded-md py-3 items-center gap-x-3`}
                        >
                            <BsHouseExclamationFill className="flex-shrink-0 transition-none" />
                            {sidebarOpen && (
                                <span className="text-sm font-medium truncate">
                                    Rent/Buy
                                </span>
                            )}
                        </Link>

                        <Link
                            href={{ pathname: "/sell/" }}
                            className={`${
                                sidebarOpen ? "px-5" : "px-3"
                            } flex text-blue-900 hover:bg-defaultBlue hover:text-white rounded-md py-3 items-center gap-x-3`}
                        >
                            <FaMoneyBill1Wave className="flex-shrink-0 transition-none" />
                            {sidebarOpen && (
                                <span className="text-sm font-medium truncate">
                                    Sell
                                </span>
                            )}
                        </Link>

                        {session?.user.role !== "agent" && (
                            <Link
                                href={{ pathname: "/agents" }}
                                className={`${sidebarOpen ? "px-5" : "px-3"} ${
                                    pathname === "/agents"
                                        ? "bg-defaultBlue text-white"
                                        : "text-blue-900 hover:bg-defaultBlue hover:text-white"
                                } flex text-blue-900 hover:bg-defaultBlue hover:text-white rounded-md py-3 items-center gap-x-3`}
                            >
                                <FaUser className="flex-shrink-0 transition-none" />
                                {sidebarOpen && (
                                    <span className="text-sm font-medium truncate">
                                        Agents
                                    </span>
                                )}
                            </Link>
                        )}

                        {session?.user.role !== "agent" && (
                            <Link
                                href={{ pathname: "/become-an-agent" }}
                                className={`${
                                    sidebarOpen ? "px-5" : "px-3"
                                } flex text-blue-900 hover:bg-defaultBlue hover:text-white rounded-md py-3 items-center gap-x-3`}
                            >
                                <MdOutlineTransferWithinAStation className="flex-shrink-0 transition-none" />
                                {sidebarOpen && (
                                    <span className="text-sm font-medium truncate">
                                        Become an Agent
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* <button
                            className={`${
                                sidebarOpen ? "px-5" : "px-3"
                            } flex text-blue-900 hover:bg-defaultBlue hover:text-white rounded-md py-3 items-center gap-x-3`}
                        >
                            <TiMessages className="flex-shrink-0 transition-none" />
                            {sidebarOpen && (
                                <span className="text-sm font-medium truncate">
                                    Messages
                                </span>
                            )}
                        </button> */}
                    </div>

                    <div className="flex flex-col gap-y-3">
                        <button
                            className={`${
                                sidebarOpen
                                    ? "px-5 py-3"
                                    : "p-1 justify-center items-center"
                            } flex bg-slate-200 rounded-md items-center gap-x-3`}
                        >
                            {session?.user.profileImage ? (
                                <Image
                                    className="rounded-full w-[30px] h-[30px] object-contain bg-gray-100"
                                    sizes="100%"
                                    width={30}
                                    height={30}
                                    src={session.user.profileImage}
                                    alt="user"
                                />
                            ) : (
                                <FaRegUserCircle
                                    size={18}
                                    className="flex-shrink-0 transition-none"
                                />
                            )}
                            {sidebarOpen && (
                                <span className="text-sm font-medium truncate">
                                    {session?.user.name}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => signOut()}
                            className={`${
                                sidebarOpen ? "px-5" : "px-3"
                            } flex text-blue-900 hover:bg-defaultBlue hover:text-white rounded-md py-3 items-center gap-x-3`}
                        >
                            <TbLogout2 className="flex-shrink-0 transition-none" />
                            {sidebarOpen && (
                                <span className="text-sm font-medium truncate">
                                    Logout
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
