import "mapbox-gl/dist/mapbox-gl.css"
import { FaTimes } from "react-icons/fa"
import { motion } from "framer-motion"
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl"
import type mapboxgl from "mapbox-gl"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import img1 from "../images/dashboard1.jpg"
import { FaBath, FaBed, FaLocationPin } from "react-icons/fa6"
import { TbRulerMeasure } from "react-icons/tb"
import { saveCoordinates } from "@/redux/reducer"
import { FetchedPropertyObj, MapComponentProps, PropertyObject } from "@/types"
import Link from "next/link"
import MapSearch from "./MapSearch"

const AccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export const MapComponent: React.FC<MapComponentProps> = ({
    properties,
    showLocationCircle,
    canPlaceMarker,
    setMarkerLongLat,
}) => {
    const { savedLongitude, savedLatitude } = useSelector(
        (state: RootState) => state.user
    )
    const dispatch = useDispatch()
    const [openMapModal, setOpenMapModal] = useState(false)
    const [mouseMapLocation, setMouseMapLocation] = useState({
        lng: 0,
        lat: 0,
        active: false,
    })
    const [selectedProperty, setSelectedProperty] =
        useState<FetchedPropertyObj>()

    const geoControlRef = useRef<mapboxgl.GeolocateControl>(null)

    function clickEvent(e: mapboxgl.MapLayerMouseEvent) {
        e.preventDefault()
        const { lng, lat } = e.lngLat
        setMouseMapLocation({ lng: 0, lat: 0, active: false })
        setMouseMapLocation({ lng, lat, active: true })
        if (setMarkerLongLat)
            setMarkerLongLat({ longitude: lng, latitude: lat })
    }

    function nullClick() {
        return null
    }

    return (
        <>
            <div className="w-full h-full absolute z-0 top-0 left-0"></div>
            {openMapModal && (
                <motion.div
                    initial={{
                        top: "-100%",
                        opacity: 0,
                    }}
                    animate={{
                        top: ".5rem",
                        opacity: 1,
                    }}
                    className="flex flex-col gap-y-3 justify-between absolute z-10 top-2 left-2 bg-white rounded-lg h-[9.5rem] w-[70%] p-3"
                >
                    <div className="flex flex-1 gap-x-2">
                        <div className="w-[5rem] h-full flex-shrink-0 overflow-hidden">
                            <Image
                                src={
                                    selectedProperty
                                        ? selectedProperty.primaryImage
                                        : ""
                                }
                                fill
                                sizes="100%"
                                className="w-full !relative h-full rounded-md object-fill bg-gray-300"
                                alt="Map-img"
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                            <b className="line-clamp-1">
                                {selectedProperty?.location}
                            </b>
                            <div className="flex gap-x-1.5 justify-between items-center flex-shrink-0">
                                <div className="flex gap-x-1 items-center bg-gray-200 p-1.5 px-2.5 rounded flex-shrink-0">
                                    <FaBed
                                        color="#FAC853"
                                        className="flex-shrink-0"
                                    />
                                    <span className="text-xs truncate">
                                        {selectedProperty?.bedroom}
                                    </span>
                                </div>
                                <div className="flex gap-x-1 items-center bg-gray-200 p-1.5 px-2.5 rounded flex-shrink-0">
                                    <FaBath
                                        color="#2D88FF"
                                        className="flex-shrink-0"
                                    />
                                    <span className="text-xs truncate">
                                        {selectedProperty?.bathroom}
                                    </span>
                                </div>
                                <div className="flex gap-x-1 items-center bg-gray-200 p-1.5 px-2.5 rounded flex-shrink-0">
                                    <TbRulerMeasure
                                        color="#712B05"
                                        className="flex-shrink-0"
                                    />
                                    <span className="text-xs truncate">
                                        {selectedProperty?.size}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => setOpenMapModal(false)}
                            className="h-full pl-2 flex items-center flex-shrink-0 cursor-pointer border-l border-l-black/30"
                        >
                            <FaTimes
                                size={16}
                                className="flex-shrink-0 text-gray-300"
                            />
                        </div>
                    </div>
                    <Link
                        href={{
                            pathname: `/property/${selectedProperty?._id}`,
                        }}
                        className="w-full flex justify-center rounded-md text-white bg-defaultBlue hover:bg-defaultBlueHover font-semibold text-sm py-2 flex-shrink-0"
                    >
                        View
                    </Link>
                </motion.div>
            )}
            <Map
                onClick={canPlaceMarker ? clickEvent : nullClick}
                onLoad={(e) => geoControlRef.current?.trigger()}
                mapboxAccessToken={AccessToken}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                initialViewState={{
                    latitude: savedLongitude,
                    longitude: savedLatitude,
                    zoom: 10,
                }}
            >
                <MapSearch />
                <NavigationControl />
                <GeolocateControl
                    onGeolocate={(e) => {
                        dispatch(
                            saveCoordinates([
                                e.coords.longitude,
                                e.coords.latitude,
                            ])
                        )
                    }}
                    // showAccuracyCircle={false}
                    ref={geoControlRef}
                    showAccuracyCircle={showLocationCircle}
                />
                {properties?.map((property, index) => (
                    <Marker
                        key={index}
                        latitude={property.coordinates.latitude}
                        longitude={property.coordinates.longitude}
                    >
                        <button
                            className="marker-btn"
                            onClick={(e) => {
                                e.preventDefault()
                                setSelectedProperty(property)
                                setOpenMapModal(true)
                            }}
                        >
                            <div className="w-[3rem] h-[3rem] rounded-full flex justify-center items-center bg-[#2D88FF]/[24%]">
                                <div className="w-[1.5rem] h-[1.5rem] rounded-full bg-[#509CFF]"></div>
                            </div>
                        </button>
                    </Marker>
                ))}
                {mouseMapLocation.active ? (
                    <Marker
                        longitude={mouseMapLocation.lng}
                        latitude={mouseMapLocation.lat}
                    >
                        <FaLocationPin size={28} />
                    </Marker>
                ) : null}
            </Map>
        </>
    )
}
