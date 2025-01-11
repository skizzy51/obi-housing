"use client"

import { FaCaretDown, FaLocationDot, FaStar } from "react-icons/fa6"
import agentSearchImg from "../../images/agent-search-img.png"
import agentSearchBg from "../../images/agent-search-bg.png"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { getAgents } from "@/redux/reducer"
import { HashLoader } from "react-spinners"

export default function Page() {
    const { agents, loading } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getAgents())
    }, [])

    return (
        <div className="w-full h-screen pt-5">
            <div className="w-[85%] h-full flex flex-col gap-y-7 mx-auto">
                <div className="w-full rounded-lg p-5 px-8 bg-white shadow-[0px_5px_12px_3px_#00000024]">
                    <h1 className="text-2xl font-bold text-end">
                        Meet our Agents
                    </h1>
                    <div className="flex justify-between items-center mt-5">
                        <button className="px-4 py-1.5 w-[12rem] flex items-center gap-x-2 border border-black/40">
                            <FaStar size={14} />
                            <span className="text-sm">Rating</span>
                            <FaCaretDown size={11} className="ml-auto" />
                        </button>
                        <button className="px-4 py-1.5 w-[12rem] flex items-center gap-x-2 border border-black/40">
                            <FaStar size={14} />
                            <span className="text-sm">Experience</span>
                            <FaCaretDown size={11} className="ml-auto" />
                        </button>
                        <button className="px-4 py-1.5 w-[12rem] flex items-center gap-x-2 border border-black/40">
                            <FaStar size={14} />
                            <span className="text-sm">Service Type</span>
                            <FaCaretDown size={11} className="ml-auto" />
                        </button>
                        <button className="px-4 py-1.5 w-[12rem] flex items-center gap-x-2 border border-black/40">
                            <FaStar size={14} />
                            <span className="text-sm">Fee</span>
                            <FaCaretDown size={11} className="ml-auto" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex relative overflow-hidden">
                    <Image
                        className="h-full w-auto z-10 relative"
                        src={agentSearchImg}
                        alt="Agent"
                    />

                    <Image
                        className="absolute z-0 h-full"
                        src={agentSearchBg}
                        alt="Agent"
                    />

                    {loading ? (
                        <div className="flex-1 flex justify-center items-center">
                            <HashLoader color="black" />
                        </div>
                    ) : (
                        <>
                            {agents.length < 1 ? (
                                <div className="flex-1 flex justify-center items-center">
                                    <h2 className="text-3xl font-semibold p-2 bg-white rounded-md z-10">
                                        No Agents available
                                    </h2>
                                </div>
                            ) : (
                                <div className="flex-1 grid grid-cols-4 gap-x-5 gap-y-9 pb-5 overflow-y-auto z-10 relative custom-scrollbar-low-opacity">
                                    {agents.map((agent) => (
                                        <Link
                                            href={{
                                                pathname: "/agent-profile",
                                            }}
                                            key={agent._id}
                                            className="h-[18rem] flex flex-col bg-white"
                                        >
                                            <Image
                                                className="w-full h-[65%] flex-shrink-0 object-contain bg-gray-100"
                                                src={agent.profileImage}
                                                width={100}
                                                height={100}
                                                alt="Agent"
                                            />
                                            <div className="flex flex-col justify-around flex-1 p-2 px-2.5">
                                                <b className="text-center line-clamp-1 text-lg">
                                                    {agent.name}
                                                </b>
                                                <div className="flex gap-x-1 items-center text-xs font-medium">
                                                    <FaLocationDot size={12} />
                                                    <span className="line-clamp-1">
                                                        {agent.location}
                                                    </span>
                                                </div>
                                                <p className="text-xs opacity-60 line-clamp-1">
                                                    {
                                                        agent.propertiesManaged
                                                            .length
                                                    }{" "}
                                                    properties dealt
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
