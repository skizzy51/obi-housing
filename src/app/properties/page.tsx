"use client"
import Image from "next/image"
import { FaBath, FaBed, FaLocationDot, FaMinus, FaPlus } from "react-icons/fa6"
import { TbRulerMeasure } from "react-icons/tb"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import { useEffect, useState } from "react"
import { MapComponent } from "@/components/Map"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { getProperties } from "@/redux/reducer"
import { FetchedPropertyObj } from "@/types"
import { BeatLoader } from "react-spinners"
import { formatPrice } from "@/helpers"
import { useRouter } from "next/navigation"

export default function Page() {
    const { properties, loading } = useSelector(
        (state: RootState) => state.user
    )
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const [value, setValue] = useState<number[]>([150000, 200000])

    useEffect(() => {
        dispatch(getProperties())
    }, [])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    return (
        <div className="h-screen w-full flex">
            <div className="basis-[17%] custom-scrollbar bg-white flex flex-col px-5 py-4 gap-y-10 overflow-y-auto ">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold line-clamp-1">
                        Refine your search
                    </h3>
                    <span className="text-xs text-defaultBlue hover:underline cursor-pointer">
                        Clear all
                    </span>
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <label className="text-sm font-medium">Location</label>
                    <select className="flex justify-between border text-sm border-black/50 rounded p-2.5 py-2">
                        <option value="">Lagos</option>
                        <option value="">Abuja</option>
                        <option value="">Kwara</option>
                    </select>
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <label className="text-sm font-medium">Listing type</label>
                    <select className="flex justify-between border text-sm border-black/50 rounded p-2.5 py-2">
                        <option value="">Rent</option>
                        <option value="">Buy</option>
                        <option value="">Lease</option>
                    </select>
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <label className="text-sm font-medium">Price Range</label>
                    <Box>
                        <Slider
                            value={value}
                            min={100000}
                            max={500000}
                            disableSwap
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <label className="text-sm font-medium">Size</label>
                    <div className="flex justify-between items-center">
                        <button className="px-2.5 py-2 bg-gray-200 rounded">
                            <FaPlus size={14} />
                        </button>
                        <span className="text-sm">5 plot(s)</span>
                        <button className="px-2.5 py-2 bg-gray-200 rounded">
                            <FaMinus size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <label className="text-sm font-medium">Bedroom(s)</label>
                    <div className="grid grid-cols-4 gap-x-3">
                        <button className="py-1.5 text-xs font-medium bg-gray-200 hover:bg-defaultBlue hover:text-white rounded">
                            Any
                        </button>
                        <button className="py-1.5 text-xs font-medium bg-gray-200 hover:bg-defaultBlue hover:text-white rounded">
                            1+
                        </button>
                        <button className="py-1.5 text-xs font-medium bg-gray-200 hover:bg-defaultBlue hover:text-white rounded">
                            2+
                        </button>
                        <button className="py-1.5 text-xs font-medium bg-gray-200 hover:bg-defaultBlue hover:text-white rounded">
                            3+
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <label className="text-sm font-medium">Bathroom(s)</label>
                    <div className="grid grid-cols-4 gap-x-3">
                        <button className="py-1.5 text-xs font-medium bg-gray-200 hover:bg-defaultBlue hover:text-white rounded">
                            Any
                        </button>
                        <button className="py-1.5 text-xs font-medium bg-gray-200 hover:bg-defaultBlue hover:text-white rounded">
                            1+
                        </button>
                        <button className="py-1.5 text-xs font-medium bg-gray-200 hover:bg-defaultBlue hover:text-white rounded">
                            2+
                        </button>
                        <button className="py-1.5 text-xs font-medium bg-gray-200 hover:bg-defaultBlue hover:text-white rounded">
                            3+
                        </button>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="flex-1 flex justify-center items-center">
                    <BeatLoader />
                </div>
            ) : (
                <div className="custom-scrollbar p-2 flex-1 grid grid-cols-2 gap-x-5 gap-y-8 overflow-y-auto">
                    {properties.map((property, index) => {
                        return (
                            <div
                                onClick={() =>
                                    router.push(`/property/${property._id}`)
                                }
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
            <div className="basis-[45%] bg-gray-300 flex relative overflow-hidden">
                <MapComponent
                    showLocationCircle={true}
                    properties={properties}
                />
            </div>
        </div>
    )
}
