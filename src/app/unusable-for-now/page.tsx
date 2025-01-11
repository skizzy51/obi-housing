"use client"
import Image, { ImageLoader } from "next/image"
import img1 from "../../images/dashboard1.jpg"
import loadingImg from "../../images/please-wait.png"
import { FaBath, FaBed, FaLocationDot } from "react-icons/fa6"
import { TbRulerMeasure } from "react-icons/tb"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import * as mapboxData from "../../mapbox-data.json"
import { MapComponent } from "@/components/Map"
import React, { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import Link from "next/link"
import { getProperties } from "@/redux/reducer"
import { BeatLoader } from "react-spinners"
import { FetchedPropertyObj } from "@/types"
import { formatPrice } from "@/helpers"

export default function Page() {
    const { properties, loading } = useSelector(
        (state: RootState) => state.user
    )
    const dispatch = useDispatch<AppDispatch>()
    const [phase, setPhase] = useState(1)
    const [selectedProperty, setSelectedProperty] =
        useState<FetchedPropertyObj>()

    useEffect(() => {
        dispatch(getProperties())
    }, [])

    return (
        <div
            className={`${
                phase === 2 ? "gap-x-10" : ""
            } w-full h-screen px-9 py-5 flex`}
        >
            {phase === 1 ? (
                <div className="basis-[45%] flex flex-col gap-y-4">
                    <h3 className="font-bold text-xl">
                        Most viewed properties This Week
                    </h3>
                    {loading ? (
                        <div className="flex-1 flex justify-center items-center">
                            <BeatLoader />
                        </div>
                    ) : (
                        <div className="custom-scrollbar pr-2 flex-1 grid grid-cols-2 gap-x-5 gap-y-8 overflow-y-auto">
                            {properties.map((property, index) => {
                                return (
                                    <div
                                        onClick={() => {
                                            setSelectedProperty(property)
                                            setPhase(2)
                                        }}
                                        key={property._id}
                                        className="h-[20rem] rounded-lg flex flex-col cursor-pointer bg-white"
                                    >
                                        <div className="w-full h-[65%] relative flex-shrink-0">
                                            <Image
                                                src={property.primaryImage}
                                                sizes="100%"
                                                fill
                                                className="h-full w-full rounded-t-lg bg-gray-500"
                                                alt="House"
                                            />
                                            <div className="absolute bottom-3 right-3 text-xs font-medium bg-gray-300 px-2 py-1 rounded">
                                                ₦ {formatPrice(property.price)}
                                            </div>
                                            <div className="absolute top-3 right-3 text-sm font-medium bg-defaultBlue text-white px-2 py-1 rounded">
                                                {property.listingType}
                                            </div>
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                            <div className="flex gap-x-2 items-center flex-shrink-0">
                                                <FaLocationDot
                                                    size={17}
                                                    className="flex-shrink-0"
                                                />
                                                <span className="text-sm truncate">
                                                    {property.location}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center overflow-x-hidden gap-x-1.5 flex-shrink-0">
                                                <div className="flex gap-x-1.5 items-center bg-gray-200 p-2 px-2.5 rounded">
                                                    <FaBed
                                                        color="#FAC853"
                                                        className="flex-shrink-0"
                                                    />
                                                    <span className="text-sm">
                                                        {property.bedroom}
                                                    </span>
                                                </div>
                                                <div className="flex gap-x-1.5 items-center bg-gray-200 p-2 px-2.5 rounded">
                                                    <FaBath
                                                        color="#2D88FF"
                                                        className="flex-shrink-0"
                                                    />
                                                    <span className="text-sm">
                                                        {property.bathroom}
                                                    </span>
                                                </div>
                                                <div className="flex gap-x-1.5 items-center bg-gray-200 p-2 px-2.5 rounded">
                                                    <TbRulerMeasure
                                                        color="#712B05"
                                                        className="flex-shrink-0"
                                                    />
                                                    <span className="text-sm truncate">
                                                        {property.size}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            ) : null}
            <div
                className={`${
                    phase === 1 ? "basis-[55%]" : "basis-[60%]"
                } flex flex-col gap-y-2 p-4 bg-white`}
            >
                <h3 className="font-bold text-xl">
                    Explore properties around you
                </h3>
                <div className="flex-1 bg-gray-300 relative overflow-hidden">
                    <MapComponent
                        showLocationCircle={true}
                        properties={properties}
                    />
                </div>
            </div>
            {phase === 2 ? (
                <div className="flex-1 flex flex-col gap-y-3 p-4 px-6 bg-white rounded-lg">
                    <button
                        onClick={() => setPhase(1)}
                        className="px-4 py-1.5 w-fit ml-auto flex items-center gap-x-1 text-sm rounded-md bg-[#2D88FF]/[15%] text-black"
                    >
                        <FaTimes />
                        <span>close</span>
                    </button>

                    <div className="flex-1 flex flex-col gap-y-4">
                        <div className="w-full h-[50%] dashboard-property rounded-lg bg-gray-200 relative">
                            <Image
                                src={
                                    selectedProperty
                                        ? selectedProperty.primaryImage
                                        : ""
                                }
                                fill
                                sizes="100%"
                                className="absolute top-0 left-0 object-fill h-full w-full rounded-lg"
                                alt="Property image"
                            />
                            <span className="absolute bottom-3 right-3 text-sm font-medium bg-gray-300 rounded px-2 py-1.5">
                                ₦{" "}
                                {selectedProperty
                                    ? formatPrice(selectedProperty.price)
                                    : ""}
                            </span>
                            <span className="absolute top-3 left-3 capitalize font-medium bg-defaultBlue text-white rounded px-2 py-1.5">
                                {selectedProperty
                                    ? selectedProperty.listingType
                                    : ""}
                            </span>
                        </div>

                        <div className="flex-1 flex flex-col justify-around">
                            <div className="flex gap-x-2 items-center">
                                <FaLocationDot size={20} />
                                <span
                                    title="27 Uche Ayoola Plaza, Anthony Village, Lagos"
                                    className="text-lg line-clamp-1"
                                >
                                    {selectedProperty
                                        ? selectedProperty.location
                                        : ""}
                                </span>
                            </div>

                            <div className="flex justify-between gap-x-2">
                                <div className="flex flex-col gap-y-1 flex-shrink-0">
                                    <span className="text-sm font-medium">
                                        Bathroom
                                    </span>
                                    <div className="flex items-center gap-x-2">
                                        <FaBath
                                            size={18}
                                            color="#2D88FF"
                                            className="flex-shrink-0"
                                        />
                                        <span className="text-sm">
                                            {selectedProperty
                                                ? selectedProperty.bathroom
                                                : ""}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-1 flex-shrink-0">
                                    <span className="text-sm font-medium">
                                        Bedroom(s)
                                    </span>
                                    <div className="flex items-center gap-x-2">
                                        <FaBed
                                            size={18}
                                            color="#FAC853"
                                            className="flex-shrink-0"
                                        />
                                        <span className="text-sm">
                                            {selectedProperty
                                                ? selectedProperty.bedroom
                                                : ""}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-1 flex-shrink-0">
                                    <span className="text-sm font-medium">
                                        Size
                                    </span>
                                    <div className="flex items-center gap-x-2">
                                        <TbRulerMeasure
                                            size={18}
                                            color="#712B05"
                                            className="flex-shrink-0"
                                        />
                                        <span className="text-sm truncate">
                                            {selectedProperty
                                                ? selectedProperty.size
                                                : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <h4 className="font-medium">
                                    Listing Descripton
                                </h4>
                                <p className="text-xs line-clamp-3">
                                    {selectedProperty
                                        ? selectedProperty.description
                                        : ""}
                                </p>
                            </div>
                        </div>

                        <Link
                            href={{
                                pathname: `/property/${
                                    selectedProperty ? selectedProperty._id : ""
                                }`,
                            }}
                            className="w-full py-3 flex justify-center flex-shrink-0 rounded-md text-sm text-white font-semibold bg-defaultBlue hover:bg-defaultBlueHover"
                        >
                            View property
                        </Link>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
