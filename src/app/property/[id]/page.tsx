"use client"
import Image from "next/image"
import agent from "../../../images/landing-agent.png"
import { FaBath, FaBed, FaExpand, FaLocationDot, FaStar } from "react-icons/fa6"
import { useEffect, useRef, useState } from "react"
import { useClickAway } from "react-use"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { TbRulerMeasure } from "react-icons/tb"
import { MdAccessTime } from "react-icons/md"
import Link from "next/link"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { getProperty } from "@/redux/reducer"
import { formatPrice } from "@/helpers"
import { HashLoader } from "react-spinners"

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params
    const { property, loading } = useSelector((state: RootState) => state.user)

    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [viewImageModal, setViewImageModal] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const viewImageRef = useRef(null)
    const dispatch = useDispatch<AppDispatch>()

    useClickAway(viewImageRef, () => setViewImageModal(false))

    useEffect(() => {
        dispatch(getProperty(id))
    }, [])

    return (
        <div className="flex-1 h-screen py-5">
            <div className="w-full h-full overflow-y-auto custom-scrollbar flex gap-x-10 px-5">
                {viewImageModal && (
                    <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-black/80 flex">
                        {selectedImageIndex > 0 && (
                            <div
                                onClick={() =>
                                    setSelectedImageIndex((prev) => prev - 1)
                                }
                                className="h-full px-4 bg-black/40 cursor-pointer flex items-center"
                            >
                                <FaChevronLeft size={27} color="white" />
                            </div>
                        )}
                        <div
                            onClick={() => setViewImageModal(false)}
                            className="flex-1 flex relative justify-center items-center"
                        >
                            <Image
                                className="max-w-[80%] h-auto mx-auto"
                                fill
                                src={property.images[selectedImageIndex].url}
                                alt="property image"
                            />
                        </div>
                        {selectedImageIndex < property.images.length - 1 && (
                            <div
                                onClick={() =>
                                    setSelectedImageIndex((prev) => prev + 1)
                                }
                                className="h-full px-4 bg-black/40 cursor-pointer flex items-center"
                            >
                                <FaChevronRight size={27} color="white" />
                            </div>
                        )}
                    </div>
                )}
                <div className="basis-[65%]">
                    <div className="w-full h-[75%] rounded-lg relative flex items-center">
                        <Image
                            src={property.images[selectedImageIndex]?.url}
                            fill
                            sizes="100%"
                            onLoadingComplete={() => setImageLoading(false)}
                            quality={100}
                            className="object-fill bg-black/10 w-full h-full rounded-lg"
                            alt="Property image"
                        />
                        {imageLoading && (
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50">
                                <HashLoader color="white" size={24} />
                            </div>
                        )}
                        <div className="w-full absolute flex justify-between px-3">
                            {selectedImageIndex > 0 && (
                                <button
                                    onClick={() => {
                                        setImageLoading(true)
                                        setSelectedImageIndex(
                                            (prev) => prev - 1
                                        )
                                    }}
                                    className="p-2 bg-white rounded-full"
                                >
                                    <FaChevronLeft size={20} color="#2d88ff" />
                                </button>
                            )}
                            {selectedImageIndex <
                                property.images.length - 1 && (
                                <button
                                    onClick={() => {
                                        setImageLoading(true)
                                        setSelectedImageIndex(
                                            (prev) => prev + 1
                                        )
                                    }}
                                    className="p-2 bg-white rounded-full ml-auto"
                                >
                                    <FaChevronRight size={20} color="#2d88ff" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setViewImageModal(true)}
                            className="absolute right-3 top-3 text-defaultBlue rounded-md p-2 bg-white z-20"
                        >
                            <FaExpand size={24} />
                        </button>
                    </div>
                    <div className="w-full mt-7 rounded-lg bg-white p-6">
                        <div className="flex justify-between items-start gap-x-4">
                            <h1 className="font-semibold text-xl max-w-[65%]">
                                {property.location}
                            </h1>
                            <span className="flex-shrink-0">
                                Price:{" "}
                                <b className="text-xl">
                                    ₦ {formatPrice(property.price)}
                                </b>
                            </span>
                        </div>

                        <div className="flex gap-x-[7rem] mt-10">
                            <div className="flex flex-col gap-y-1 flex-shrink-0">
                                <span className="text-sm font-medium text-center">
                                    Bathroom
                                </span>
                                <div className="flex items-center gap-x-2">
                                    <FaBath
                                        size={24}
                                        color="#2D88FF"
                                        className="flex-shrink-0"
                                    />
                                    <span className="text">
                                        {property.bathroom}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-1 flex-shrink-0">
                                <span className="text-sm font-medium text-center">
                                    Bedroom(s)
                                </span>
                                <div className="flex items-center gap-x-2">
                                    <FaBed
                                        size={24}
                                        color="#FAC853"
                                        className="flex-shrink-0"
                                    />
                                    <span className="text">
                                        {property.bedroom}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-1 flex-shrink-0">
                                <span className="text-sm font-medium text-center">
                                    Size
                                </span>
                                <div className="flex items-center gap-x-2">
                                    <TbRulerMeasure
                                        size={24}
                                        color="#712B05"
                                        className="flex-shrink-0"
                                    />
                                    <span className="text truncate">
                                        {property.size}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-1 flex-shrink-0">
                                <span className="text-sm font-medium text-center">
                                    Year built
                                </span>
                                <div className="flex items-center gap-x-2">
                                    <MdAccessTime
                                        size={24}
                                        color="grey"
                                        className="flex-shrink-0"
                                    />
                                    <span className="text truncate">
                                        {property.dateBuilt}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold mt-10">
                            Listing Descripton
                        </h3>
                        <pre className="text-sm mt-2 whitespace-pre leading-6">
                            {property.description}
                        </pre>

                        <h3 className="text-lg font-semibold mt-10">
                            Amenities
                        </h3>
                        <div className="flex flex-wrap mt-3 gap-x-[5rem] gap-y-10">
                            {property.amenities.map((item, index) => (
                                <span
                                    key={index}
                                    className="text-sm text-black/70"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    {property.agentsAssigned.length < 1 ? (
                        <div className="w-full rounded-lg p-6 bg-white">
                            <h5>
                                No Agents have been assigned to this property
                                yet.
                            </h5>
                        </div>
                    ) : (
                        <div className="w-full p-6 pb-0 bg-white rounded-lg">
                            <div className="flex items-center gap-x-6">
                                <Image
                                    src={agent}
                                    className="rounded-full w-[6rem] h=[6rem] object-contain flex-shrink-0"
                                    alt="Agent"
                                />
                                <div className="flex flex-col gap-y-1.5">
                                    <h3 className="text-2xl font-bold">
                                        Stanley Francis
                                    </h3>
                                    <p className="text-xs">
                                        stanleyfrancis@gmail.com
                                    </p>
                                    <div className="flex gap-x-1.5">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <FaStar
                                                key={num}
                                                size={20}
                                                color="#EFFF00"
                                                className="flex-shrink-0"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs mt-5">
                                As a dedicated real estate professional, I am
                                passionate about helping clients achieve their
                                real estate goals and dreams. With a strong
                                focus on integrity, transparency, and
                                personalized service, I strive to provide an
                                exceptional experience for every client, whether
                                buying, selling, or investing in properties.
                            </p>

                            <div className="mt-8 flex flex-col gap-y-3">
                                <b className="text-xs">
                                    Experience:{" "}
                                    <span className="opacity-40">6 years</span>
                                </b>
                                <b className="text-xs">
                                    Specialization:{" "}
                                    <span className="opacity-40">
                                        Residential, commercial
                                    </span>
                                </b>
                                <b className="text-xs">
                                    Language(s):{" "}
                                    <span className="opacity-40">
                                        English, French
                                    </span>
                                </b>
                                <b className="text-xs">
                                    Fee:{" "}
                                    <span className="opacity-40">$200,000</span>
                                </b>
                                <b className="text-xs">
                                    Location:{" "}
                                    <span className="opacity-40">
                                        Lagos, Nigeria
                                    </span>
                                </b>
                            </div>

                            <Link href={{ pathname: "/agent-profile" }}>
                                <button className="py-3 mt-8 w-full border-t border-t-black/40 text-defaultBlue text-sm">
                                    View Profile
                                </button>
                            </Link>
                        </div>
                    )}

                    <div className="w-full p-4 rounded-lg bg-white mt-7 flex justify-between items-center">
                        <h3 className="font-bold">View location on map</h3>
                        <button className="p-2.5 rounded-full hover:bg-slate-100">
                            <FaExpand color="#2d88ff" size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
