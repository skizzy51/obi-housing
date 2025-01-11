"use client"
import img1 from "../../images/dashboard1.jpg"
import profile from "../../images/dashboard-profile-pic-dummy.png"
import Image from "next/image"
import {
    FaBath,
    FaBed,
    FaCodePullRequest,
    FaPlus,
    FaStar,
} from "react-icons/fa6"
import { MdManageAccounts } from "react-icons/md"
import { TbRulerMeasure } from "react-icons/tb"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { BeatLoader, HashLoader } from "react-spinners"
import { ChangeEvent, useEffect, useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { getAgents, getRequestsUsers, getUserProperties } from "@/redux/reducer"
import { RootState } from "@/redux/store"
import { formatPrice, ratingsArray } from "@/helpers"
import { FetchedPropertyObj } from "@/types"
import Link from "next/link"

export default function Page() {
    const { data: session, status } = useSession()
    const { loading, userProperties, agents, requestsUsers } = useSelector(
        (state: RootState) => state.user
    )
    const router = useRouter()
    const dispatch = useDispatch()

    const [userPropertyArray, setUserPropertyArray] = useState<
        FetchedPropertyObj[]
    >([])

    useEffect(() => {
        if (session?.user) {
            dispatch(getUserProperties(session.user.accessToken) as any)
            if (session.user.role === "user") dispatch(getAgents() as any)
            else dispatch(getRequestsUsers() as any)
        }
        // console.log(session?.user)
    }, [session])

    useEffect(() => {
        setUserPropertyArray([...userProperties])
    }, [userProperties])

    function onChangePropertyType(e: ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === "All") {
            setUserPropertyArray([...userProperties])
        } else if (e.target.value === "Rent") {
            let dummyArray = userProperties.filter(
                (property) => property.listingType === "rent"
            )
            setUserPropertyArray([...dummyArray])
        } else if (e.target.value === "Sell") {
            let dummyArray = userProperties.filter(
                (property) => property.listingType === "sell"
            )
            setUserPropertyArray([...dummyArray])
        }
    }

    function addNewListing() {
        router.push("/sell")
    }

    if (status === "loading") {
        return (
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/50">
                <BeatLoader color="white" size={30} />
            </div>
        )
    } else {
        if (status === "unauthenticated") {
            return (
                <div className="h-screen w-screen">
                    <h1 className="text-4xl font-bold">Not logged in</h1>
                </div>
            )
        }

        return (
            <div className="w-full h-screen p-5 flex gap-x-7 px-8 py-8 overflow-hidden">
                <div className="basis-[70%] overflow-y-auto custom-scrollbar-low-opacity">
                    <div className="flex justify-between gap-x-4">
                        <button
                            onClick={addNewListing}
                            className="px-4 py-5 w-[28%] rounded-xl flex items-center gap-x-3 flex-shrink-0 bg-white"
                        >
                            <div className="rounded-full bg-defaultBlueBackground flex-shrink-0 p-2">
                                <FaPlus size={18} color="#2d88ff" />
                            </div>
                            <span
                                title="Add a new listing"
                                className="font-semibold truncate"
                            >
                                Add a new listing
                            </span>
                        </button>
                        <button
                            disabled
                            className="px-4 py-5 w-[28%] rounded-xl flex items-center gap-x-3 flex-shrink-0 bg-white disabled:opacity-60"
                        >
                            <div className="rounded-full bg-defaultBlueBackground flex-shrink-0 p-2">
                                <MdManageAccounts size={18} color="green" />
                            </div>
                            <span
                                title="Manage listings"
                                className="font-semibold truncate"
                            >
                                Manage listings
                            </span>
                        </button>
                        <button
                            disabled
                            className="px-4 py-5 w-[28%] rounded-xl flex items-center gap-x-3 flex-shrink-0 bg-white disabled:opacity-60"
                        >
                            <div className="rounded-full bg-defaultBlueBackground flex-shrink-0 p-2">
                                <FaCodePullRequest size={18} color="#C13300" />
                            </div>
                            <span
                                title={
                                    session?.user.role === "user"
                                        ? "Request an agent"
                                        : "Manage assistance requests"
                                }
                                className="font-semibold truncate"
                            >
                                {session?.user.role === "user"
                                    ? "Request an Agent"
                                    : "Manage assistance requests"}
                            </span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-y-2 mt-5">
                        <div className="flex gap-x-3 items-center">
                            <h3 className="font-bold">Your listings</h3>
                            <select
                                onChange={onChangePropertyType}
                                className="outline-none px-3 py-2 text-black text-xs bg-white"
                            >
                                <option>All</option>
                                <option>Rent</option>
                                <option>Sell</option>
                            </select>
                        </div>

                        <div className="w-full rounded-lg p-3 flex flex-nowrap gap-x-5 overflow-x-auto custom-scrollbar-low-opacity bg-white">
                            {loading ? (
                                <div className="w-full h-full flex justify-center items-center py-7">
                                    <HashLoader size={30} color="#2d88ff" />
                                </div>
                            ) : (
                                <>
                                    {userPropertyArray.length < 1 ? (
                                        <div className="flex flex-col gap-y-3.5 py-4 justify-center items-center w-full h-full">
                                            <h3 className="text-xl font-semibold">
                                                No properties listed yet
                                            </h3>
                                            <Link
                                                href={{ pathname: "/sell" }}
                                                className="text-sm px-5 py-2.5 rounded font-medium text-white bg-defaultBlue hover:bg-defaultBlueHover"
                                            >
                                                List Now
                                            </Link>
                                        </div>
                                    ) : (
                                        <>
                                            {userPropertyArray.map(
                                                (property) => {
                                                    return (
                                                        <Link
                                                            href={{
                                                                pathname: `property/${property._id}`,
                                                            }}
                                                            key={property._id}
                                                            className="flex flex-col h-[15rem] w-[13rem] flex-shrink-0 hover:shadow-md overflow-hidden cursor-pointer"
                                                        >
                                                            <div className="h-[65%] w-full overflow-hidden relative">
                                                                <Image
                                                                    className="h-full w-full"
                                                                    sizes="100%"
                                                                    width={50}
                                                                    height={50}
                                                                    src={
                                                                        property.primaryImage
                                                                    }
                                                                    alt="image"
                                                                />
                                                                <div className="rounded-md p-1.5 absolute top-3 left-3 text-xs bg-defaultBlue text-white">
                                                                    {
                                                                        property.listingType
                                                                    }
                                                                </div>
                                                                <div className="rounded-md p-1.5 absolute bottom-3 right-3 text-xs bg-gray-200">
                                                                    ₦
                                                                    {formatPrice(
                                                                        property.price
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-y-2 flex-1 p-3">
                                                                <span className="text-xs line-clamp-1">
                                                                    {
                                                                        property.location
                                                                    }
                                                                </span>
                                                                <div className="flex gap-x-1 justify-between items-center">
                                                                    <div className="flex gap-x-1.5 items-center bg-gray-200 p-2 px-2.5 rounded">
                                                                        <FaBed
                                                                            size={
                                                                                14
                                                                            }
                                                                            color="#FAC853"
                                                                            className="flex-shrink-0"
                                                                        />
                                                                        <span className="text-xs">
                                                                            {
                                                                                property.bedroom
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex gap-x-1.5 items-center bg-gray-200 p-2 px-2.5 rounded">
                                                                        <FaBath
                                                                            size={
                                                                                14
                                                                            }
                                                                            color="#2D88FF"
                                                                            className="flex-shrink-0"
                                                                        />
                                                                        <span className="text-xs">
                                                                            {
                                                                                property.bedroom
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        title={
                                                                            property.size
                                                                        }
                                                                        className="flex gap-x-1.5 items-center bg-gray-200 p-2 px-2.5 rounded"
                                                                    >
                                                                        <TbRulerMeasure
                                                                            size={
                                                                                14
                                                                            }
                                                                            color="#712B05"
                                                                            className="flex-shrink-0"
                                                                        />
                                                                        <span className="text-xs line-clamp-1">
                                                                            {
                                                                                property.size
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                }
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {session?.user.role === "user" && (
                        <div className="flex flex-col gap-y-2 mt-5">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold">Your watchlist</h3>
                                <button
                                    title="Add to watchlist"
                                    className="rounded-md p-2 bg-white"
                                >
                                    <FaPlus size={20} color="#2d88ff" />
                                </button>
                            </div>

                            <div className="w-full rounded-lg p-4 flex flex-nowrap gap-x-5 overflow-x-auto custom-scrollbar-low-opacity bg-white ">
                                <div className="h-[12rem] w-[18rem] rounded-lg relative cursor-pointer bg-gray-200">
                                    <Image
                                        className="h-full w-full rounded-lg"
                                        sizes="100%"
                                        width={50}
                                        height={50}
                                        src={img1}
                                        alt="image"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full p-3.5 bg-black/40 rounded-lg">
                                        <span className="font-medium text-lg leading-tight line-clamp-3 text-white">
                                            23 oyedele ogunniyi street, Anthony
                                            Village, Lagos
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="basis-[30%] flex flex-col overflow-y-auto custom-scrollbar-low-opacity">
                    <div className="rounded-xl w-full flex flex-col gap-y-5 py-6 px-4 items-center bg-white relative">
                        {session?.user.profileImage ? (
                            <Image
                                className="rounded-full w-[12rem] h-[12rem] object-contain bg-gray-100"
                                sizes="100%"
                                width={200}
                                height={200}
                                src={session.user.profileImage}
                                alt="profile"
                            />
                        ) : (
                            <FaUserCircle size={180} color="#d1d5db" />
                        )}
                        <b className="text-2xl line-clamp-2">
                            Welcome {session?.user.name}
                        </b>
                    </div>

                    <div className="rounded-xl w-full p-5 flex flex-col gap-y-2 mt-4 bg-white">
                        <h3 className="font-semibold">
                            {session?.user.role === "user"
                                ? "Request Mentor Assistance"
                                : "Assistance Requests from users"}
                        </h3>
                        {(session?.user.role === "user"
                            ? agents
                            : requestsUsers
                        ).length < 1 ? (
                            <div className="w-full flex flex-col justify-center items-center p-4 rounded-lg bg-[#e0f6ff] custom-scrollbar-low-opacity">
                                <h5 className="font-medium text-lg text-black/50">
                                    No Agents available right now
                                </h5>
                            </div>
                        ) : (
                            <div className="w-full max-h-[14rem] overflow-y-auto flex flex-col px-4 pb-3 rounded-lg bg-[#e0f6ff] custom-scrollbar-low-opacity">
                                {(session?.user.role === "user"
                                    ? agents
                                    : requestsUsers
                                ).map((agent) => {
                                    return (
                                        <div
                                            key={agent._id}
                                            className="flex gap-x-2 py-3.5 px-2 border-b border-b-black/10 items-center w-full"
                                        >
                                            {agent.profileImage.length > 0 ? (
                                                <Image
                                                    className="w-[3.2rem] h-[3.2rem] bg-gray-300 rounded-full object-contain flex-shrink-0"
                                                    src={agent.profileImage}
                                                    width={50}
                                                    height={50}
                                                    alt="profile"
                                                />
                                            ) : (
                                                <FaUserCircle
                                                    size={40}
                                                    color="#d1d5db"
                                                    className="flex-shrink-0"
                                                />
                                            )}

                                            <div className="flex justify-between items-center flex-1">
                                                <div className="flex flex-col gap-y-1.5">
                                                    <span className="text-sm font-semibold line-clamp-1">
                                                        {agent.name}
                                                    </span>
                                                    {session?.user.role ===
                                                        "user" && (
                                                        <div className="flex items-center gap-x-1">
                                                            {ratingsArray(
                                                                agent.rating
                                                            ).map((star) => (
                                                                <FaStar
                                                                    key={star}
                                                                    color="yellow"
                                                                    size={14}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {session?.user.role ===
                                                "user" ? (
                                                    <button className="px-3 py-1.5 rounded-md text-xs flex-shrink-0 text-white bg-defaultBlue">
                                                        Request
                                                    </button>
                                                ) : (
                                                    <div className="flex gap-x-2 items-center flex-shrink-0">
                                                        <button className="px-3 py-1.5 flex-shrink-0 rounded-md text-xs text-white bg-green-400">
                                                            Accept
                                                        </button>
                                                        <button className="px-3 py-1.5 flex-shrink-0 rounded-md text-xs text-white bg-red-500">
                                                            Decline
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
