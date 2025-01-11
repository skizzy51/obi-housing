"use client"
import { MapComponent } from "@/components/Map"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { FaCamera, FaPlus, FaStar, FaTrash } from "react-icons/fa6"
import { useClickAway } from "react-use"
import Agent from "../../../../images/landing-agent.png"
import Success from "../../../../images/successful-listing.png"
import Logo from "../../../../images/obi-housing-logo.svg"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { getAgents, listProperty } from "@/redux/reducer"
import { ListPropertyType } from "@/types"
import { toast } from "react-toastify"
import { HashLoader } from "react-spinners"
import Link from "next/link"
import { formatPrice } from "@/helpers"
import { useSession } from "next-auth/react"

export default function Page() {
    const { data: session, status } = useSession()
    const { listedProperty, loading, agents } = useSelector(
        (state: RootState) => state.user
    )
    const [phase, setPhase] = useState(1)
    const [mapOpen, setMapOpen] = useState(false)
    const [featureArray, setFeatureArray] = useState([""])
    const [location, setLocation] = useState("")
    const [coordinates, setCoordinates] = useState({
        longitude: 0,
        latitude: 0,
    })
    const [images, setImages] = useState<File[]>([])
    const [selectedimage, setSelectedImage] = useState(0)
    const [primaryImage, setPrimaryImage] = useState({ img: "", index: -1 })
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [size, setSize] = useState(["", "sq ft"])
    const [dateBuilt, setDateBuilt] = useState("")
    const [bathroom, setBathroom] = useState(1)
    const [bedroom, setBedroom] = useState(1)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<any[]>([])
    const [triggerCreate, setTriggerCreate] = useState(false)

    const mapRef = useRef(null)
    const inputFile = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (triggerCreate) {
            if (uploadedImages.length === images.length) {
                dispatch(
                    listProperty({
                        data: propertyData,
                        token: session?.user.accessToken,
                    })
                )
            } else {
                toast.error("Error occured while uploading images(s)")
            }
            setTriggerCreate(false)
        }
    }, [triggerCreate])

    useEffect(() => {
        dispatch(getAgents())
    }, [])

    const propertyData: ListPropertyType = {
        location,
        coordinates,
        price: Number(price),
        images: uploadedImages,
        listingType: "sell",
        description,
        primaryImage: primaryImage.img,
        bathroom,
        bedroom,
        size: `${size[0]} ${size[1]}`,
        dateBuilt,
        amenities: featureArray,
    }

    function addFeature() {
        let newArray = [...featureArray]
        newArray.push("")
        setFeatureArray(newArray)
    }

    function deleteFeature(index: number) {
        let newArray = [...featureArray]
        newArray.splice(index, 1)
        setFeatureArray(newArray)
    }

    function list() {
        const currentYear = new Date().getFullYear()
        if (images.length < 1)
            return toast.error("Please input at least one image")
        else if (coordinates.longitude === 0 || coordinates.longitude === 0)
            return toast.error("Please select location")
        else if (Number(price) < 10000)
            return toast.error("Property price must be at least $10,000")
        else if (description.trim().length < 15)
            return toast.error("Please enter a proper description")
        else if (Number(size[0]) < 1)
            return toast.error("Please enter a valid property size")
        else if (dateBuilt.length !== 4 || Number(dateBuilt) >= currentYear)
            return toast.error("Please enter a proper description")

        setUploadLoading(true)

        let progress = 0
        const dummyImageArray: any[] = []

        images.forEach((image, index) => {
            const imageFormData = new FormData()
            imageFormData.append("file", image)
            imageFormData.append(
                "api_key",
                process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
            )
            imageFormData.append("upload_preset", "pylflkyh")
            fetch("https://api.cloudinary.com/v1_1/dtflry0yk/upload", {
                method: "POST",
                body: imageFormData,
            })
                .then((res) => res.json())
                .then((res) => {
                    progress += 1
                    if (res) {
                        const { asset_id, public_id, url, signature } = res
                        let obj = {
                            asset_id,
                            public_id,
                            url,
                            signature,
                        }
                        if (primaryImage.index === index)
                            setPrimaryImage({ img: url, index })
                        dummyImageArray.push(obj)
                    } else {
                        toast.error(`Error uploading image ${index + 1}`)
                    }
                    if (progress === images.length) {
                        setUploadedImages([...dummyImageArray])
                        setUploadLoading(false)
                        setTriggerCreate(true)
                    }
                })
        })
    }

    function confirmLocation() {
        setMapOpen(false)
    }

    useClickAway(mapRef, () => {
        setMapOpen(false)
    })

    return (
        <div className="w-full h-screen flex justify-center items-center">
            {mapOpen && (
                <div className="fixed w-screen h-screen top-0 left-0 z-40 bg-black/60 flex justify-center items-center">
                    <div
                        ref={mapRef}
                        className="w-[80%] h-[90%] flex flex-col gap-y-5 p-5 bg-white rounded-lg"
                    >
                        <div className="flex justify-between">
                            <div className="flex items-center gap-x-3 basis-[50%]">
                                <span className="text-sm font-semibold whitespace-nowrap">
                                    Enter Address:
                                </span>
                                <input
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    type="text"
                                    className="text-sm py-2 px-3 flex-1 rounded bg-defaultBlue/10 outline-none"
                                />
                            </div>
                            <button
                                disabled={
                                    coordinates.longitude === 0 ||
                                    coordinates.latitude === 0
                                }
                                onClick={confirmLocation}
                                className="px-4 py-2 text-sm rounded-md text-white bg-green-400 disabled:bg-gray-300 font-semibold"
                            >
                                Done
                            </button>
                        </div>

                        <div className="flex-1 bg-gray-300 relative overflow-hidden">
                            <MapComponent
                                showLocationCircle={false}
                                canPlaceMarker={true}
                                setMarkerLongLat={setCoordinates}
                            />
                        </div>
                    </div>
                </div>
            )}
            {loading ||
                (uploadLoading && (
                    <div className="fixed h-screen w-screen bg-black/40 top-0 left-0 flex justify-center items-center z-[9999]">
                        <HashLoader size={25} color="white" />
                    </div>
                ))}
            {listedProperty.state && (
                <div className="fixed h-screen w-screen bg-black/40 top-0 left-0 flex justify-center items-center z-[9999]">
                    <div className="w-[50%] p-5 py-8 rounded-md flex flex-col items-center gap-y-6 bg-white">
                        <div className="flex gap-x-2 items-center">
                            <Image
                                src={Logo}
                                alt="success"
                                className="h-[9rem] w-auto flex-shrink-0"
                            />
                            <Image
                                src={Success}
                                alt="success"
                                className="h-[17rem] w-auto flex-shrink-0"
                            />
                        </div>
                        <h2 className="text-center text-2xl font-semibold">
                            Your property has successfully been listed
                        </h2>
                        <Link
                            href={{
                                pathname: `/property/${listedProperty.id}`,
                            }}
                            className="w-[80%] py-2.5 text-sm font-semibold text-center rounded bg-defaultBlue text-white"
                        >
                            View property
                        </Link>
                    </div>
                </div>
            )}
            {phase === 1 ? (
                <div className="w-[80%] h-[85%] flex flex-col rounded-lg bg-white py-6 pt-8 px-10 shadow-lg">
                    <h1 className="text-4xl text-center font-bold">
                        List Your Property Your Way
                    </h1>
                    <p className="text-center mt-2">
                        At Obi housing, we provide flexible options to suit your
                        needs. Whether you prefer to list your property yourself
                        or leave it to the experts, Obi housing is here to
                        support you every step of the way.
                    </p>
                    <div className="flex-1 flex gap-x-16 mt-8">
                        <div className="basis-[50%] flex flex-col">
                            <h2 className="text-2xl font-semibold text-center">
                                Self-Listing Option
                            </h2>
                            <h4 className="font-medium mt-3">
                                Prefer to handle things yourself? Our
                                self-listing option allows you to:
                            </h4>
                            <ul className="text-sm list-disc space-y-3 mt-7 text-black/80">
                                <li>
                                    Control the Process: List your property at
                                    your convenience.
                                </li>
                                <li>
                                    Upload Photos: Add your own property photos
                                    and descriptions.
                                </li>
                                <li>
                                    Set Your Price: Determine the listing price
                                    based on your own research.
                                </li>
                            </ul>
                            <button
                                onClick={() => setPhase(2)}
                                className="rounded-md text-sm font-semibold text-white py-2.5 mt-auto bg-defaultBlue"
                            >
                                List yourself
                            </button>
                        </div>
                        <div className="basis-[50%] flex flex-col">
                            <h2 className="text-2xl font-semibold text-center">
                                Agent-Assisted Listing
                            </h2>
                            <h4 className="font-medium mt-3">
                                Want a hassle-free experience? Our professional
                                agents can take care of everything:
                            </h4>
                            <ul className="text-sm list-disc space-y-3 mt-7 text-black/80">
                                <li>
                                    Property Inspection: Our agents will visit
                                    your property for a thorough inspection.
                                </li>
                                <li>
                                    Professional Photography: We capture
                                    high-quality photos to showcase your
                                    property.
                                </li>
                                <li>
                                    Accurate Evaluation: Receive expert advice
                                    on pricing and market trends.
                                </li>
                            </ul>
                            <button
                                onClick={() => setPhase(3)}
                                className="rounded-md text-sm font-semibold py-2.5 mt-auto text-defaultBlue border border-defaultBlue"
                            >
                                Use agents
                            </button>
                        </div>
                    </div>
                </div>
            ) : phase === 2 ? (
                <div className="w-[90%] h-[90%] flex gap-x-10 rounded-lg bg-white py-6 px-8 relative">
                    <button
                        onClick={() => setPhase(1)}
                        className="rounded-full absolute left-0 p-3 bg-slate-200"
                    >
                        <FaChevronLeft color="#2d88ff" size={18} />
                    </button>

                    <div className="basis-[50%] flex flex-col gap-y-4">
                        <div className="flex-1 flex justify-center items-center overflow-hidden relative bg-defaultBlue/10 rounded-md">
                            {images.length > 0 ? (
                                <>
                                    <Image
                                        width={50}
                                        height={50}
                                        src={URL.createObjectURL(
                                            images[selectedimage]
                                        )}
                                        alt="Agent"
                                        className="object-contain w-full h-full flex-shrink-0 bg-slate-200"
                                    />
                                    <div className="absolute top-5 right-5 overflow-visible">
                                        <button
                                            onClick={() =>
                                                setPrimaryImage({
                                                    img: "",
                                                    index: selectedimage,
                                                })
                                            }
                                            className={`${
                                                primaryImage.index ===
                                                selectedimage
                                                    ? "border-green-400 border-2 text-green-400"
                                                    : "border border-defaultBlue text-defaultBlue"
                                            } relative font-semibold px-5 py-2 text-sm rounded overflow-visible bg-gray-100`}
                                        >
                                            Set as primary image
                                            {primaryImage.index ===
                                                selectedimage && (
                                                <div className="absolute -top-2 -right-2 rounded-full p-2 bg-green-400">
                                                    <FaCheck
                                                        color="white"
                                                        size={10}
                                                        className=""
                                                    />
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                    <div className="absolute w-full px-4 flex justify-between">
                                        {selectedimage > 0 && (
                                            <button
                                                onClick={() =>
                                                    setSelectedImage(
                                                        (prev) => prev - 1
                                                    )
                                                }
                                                className="rounded-full p-2 bg-white"
                                            >
                                                <FaChevronLeft color="#2d88ff" />
                                            </button>
                                        )}
                                        {selectedimage < images.length - 1 && (
                                            <button
                                                onClick={() =>
                                                    setSelectedImage(
                                                        (prev) => prev + 1
                                                    )
                                                }
                                                className="rounded-full p-2 bg-white ml-auto"
                                            >
                                                <FaChevronRight color="#2d88ff" />
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : null}
                        </div>

                        <div className="flex flex-nowrap gap-x-4 overflow-x-auto custom-scrollbar-low-opacity">
                            {images.map((image, index) => {
                                let urlImg = URL.createObjectURL(image)
                                return (
                                    <div
                                        key={index}
                                        className="relative overflow-visible flex-shrink-0"
                                    >
                                        <Image
                                            onClick={() =>
                                                setSelectedImage(index)
                                            }
                                            width={50}
                                            height={50}
                                            src={urlImg}
                                            alt="Agent"
                                            className="object-contain w-[9rem] h-[5rem] cursor-pointer flex-shrink-0 bg-slate-200"
                                        />
                                        {primaryImage.index === index && (
                                            <div className="absolute bottom-0 -right-2 rounded-full p-2 bg-green-400">
                                                <FaCheck
                                                    color="white"
                                                    size={10}
                                                    className=""
                                                />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                            <div
                                onClick={() => inputFile.current?.click()}
                                className="h-[5rem] w-[9rem] flex-shrink-0 flex justify-center items-center rounded bg-defaultBlue/10 cursor-pointer"
                            >
                                <FaCamera color="#2d88ff" size={24} />
                            </div>
                        </div>

                        <input
                            ref={inputFile}
                            onChange={(e) => {
                                const files = e.target.files
                                if (files) {
                                    if (files.length > 5) {
                                        e.target.value = ""
                                        toast.error(
                                            "You cannot select more than 5 images files"
                                        )
                                    } else {
                                        const filesArray: File[] =
                                            Array.from(files)
                                        let dummyArray = [
                                            ...images,
                                            ...filesArray,
                                        ]
                                        if (dummyArray.length > 5) {
                                            toast.error(
                                                "You cannot select more than 5 images files"
                                            )
                                        } else {
                                            setImages((prev) => [
                                                ...prev,
                                                ...filesArray,
                                            ])
                                        }
                                    }
                                }
                                e.target.value = ""
                            }}
                            accept=".jpg, .jpeg, .png, .svg, .jfif"
                            multiple
                            type="file"
                            hidden
                        />
                    </div>

                    <div className="basis-[50%] flex flex-col gap-y-6 overflow-y-auto custom-scrollbar-low-opacity">
                        <div className="flex flex-col gap-y-1">
                            <label className="ml-2.5 text-xs font-semibold">
                                Location:
                            </label>
                            <div className="flex items-stretch gap-x-4 w-full">
                                <input
                                    type="text"
                                    value={location}
                                    disabled
                                    className="flex-1 px-3 py-2 bg-defaultBlue/10 outline-none rounded-md"
                                />
                                <button
                                    onClick={() => setMapOpen(true)}
                                    className="px-5 text-xs rounded border border-defaultBlue text-defaultBlue font-bold"
                                >
                                    Open Map
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <label className="ml-2.5 text-xs font-semibold">
                                Price($):
                            </label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value.replace(/\D/g, ""))
                                }
                                className="px-3 py-2 bg-defaultBlue/10 outline-none rounded-md"
                            />
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <label className="ml-2.5 text-xs font-semibold">
                                Listing description:
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="px-3 py-2 bg-defaultBlue/10 outline-none rounded-md resize-none custom-scrollbar-low-opacity"
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-between items-center gap-x-5">
                            <div className="flex flex-col gap-y-1 basis-[50%]">
                                <label className="ml-2.5 text-xs font-semibold">
                                    Size:
                                </label>
                                <div className="w-full flex gap-x-3 items-stretch">
                                    <input
                                        value={size[0]}
                                        onChange={(e) => {
                                            let dummyArray = [...size]
                                            dummyArray[0] =
                                                e.target.value.replace(
                                                    /[^0-9.]/g,
                                                    ""
                                                )
                                            setSize([...dummyArray])
                                        }}
                                        type="text"
                                        className="px-3 py-2 w-[60%] bg-defaultBlue/10 outline-none rounded-md"
                                    />
                                    <select
                                        className="text-sm border-defaultBlue border-[1.5px] px-2 rounded-md outline-none"
                                        onChange={(e) => {
                                            let dummyArray = [...size]
                                            dummyArray[1] = e.target.value
                                            setSize([...dummyArray])
                                        }}
                                    >
                                        <option>sq ft</option>
                                        <option>plot(s)</option>
                                        <option>acre(s)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-1 basis-[50%]">
                                <label className="ml-2.5 text-xs font-semibold">
                                    Year built:
                                </label>
                                <input
                                    value={dateBuilt}
                                    onChange={(e) =>
                                        setDateBuilt(
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 4)
                                        )
                                    }
                                    type="text"
                                    className="px-3 py-2 w-full bg-defaultBlue/10 outline-none rounded-md"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <label className="ml-2.5 text-xs font-semibold">
                                Rooms:
                            </label>
                            <div className="flex flex-nowrap gap-x-10 justify-between items-center">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setBedroom(num)}
                                        className={`${
                                            bedroom === num
                                                ? "text-white bg-defaultBlue"
                                                : "text-defaultBlue bg-defaultBlue/10 hover:bg-defaultBlue hover:text-white"
                                        } flex-1 py-2 font-bold rounded-md`}
                                    >
                                        {num}
                                        {num === 5 ? "+" : ""}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <label className="ml-2.5 text-xs font-semibold">
                                Bathrooms:
                            </label>
                            <div className="flex flex-nowrap gap-x-10 justify-between items-center">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        onClick={() => setBathroom(num)}
                                        key={num}
                                        className={`${
                                            bathroom === num
                                                ? "text-white bg-defaultBlue"
                                                : "text-defaultBlue bg-defaultBlue/10 hover:bg-defaultBlue hover:text-white"
                                        } flex-1 py-2 font-bold rounded-md`}
                                    >
                                        {num}
                                        {num === 5 ? "+" : ""}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <label className="ml-2.5 text-xs font-semibold">
                                Features:
                            </label>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                {featureArray.map((feature, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex gap-x-1.5 items-stretch"
                                        >
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => {
                                                    let newArray = [
                                                        ...featureArray,
                                                    ]
                                                    newArray[index] =
                                                        e.target.value
                                                    setFeatureArray(newArray)
                                                }}
                                                className="p-2 text-sm rounded-md outline-none bg-defaultBlue/10"
                                            />
                                            <button
                                                onClick={() =>
                                                    deleteFeature(index)
                                                }
                                                className="px-2.5 rounded-sm bg-slate-200"
                                            >
                                                <FaTrash
                                                    size={14}
                                                    color="#2d88ff"
                                                />
                                            </button>
                                        </div>
                                    )
                                })}
                                <button
                                    onClick={addFeature}
                                    className="p-2 w-fit flex items-center gap-x-1.5 bg-defaultBlue/10"
                                >
                                    <FaPlus size={16} color="#2d88ff" />{" "}
                                    <span className="text-xs text-defaultBlue">
                                        Add feature
                                    </span>
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={list}
                            className="w-full font-semibold rounded-md py-2.5 text-white bg-defaultBlue hover:bg-defaultBlueHover"
                        >
                            List for sale
                        </button>
                    </div>
                </div>
            ) : phase === 3 ? (
                <div className="w-[60%] h-[90%] flex flex-col gap-y-6 rounded-lg bg-white p-6 relative">
                    <div className="flex justify-center items-center">
                        <h2 className="text-xl font-semibold">
                            Request Agents assistance
                        </h2>
                        <FaChevronLeft
                            size={24}
                            onClick={() => setPhase(1)}
                            className="cursor-pointer absolute left-3"
                            color="#2d88ff"
                        />
                    </div>

                    <div className="flex-1 grid grid-cols-3 gap-x-7 gap-y-8 overflow-y-auto custom-scrollbar-low-opacity">
                        {agents.map((agent) => (
                            <div
                                key={agent._id}
                                className="flex flex-col h-fit rounded-md shadow"
                            >
                                <div className="w-full h-[12rem] relative bg-slate-100 rounded-md">
                                    <Image
                                        className="object-contain w-full h-full"
                                        src={agent.profileImage}
                                        width={100}
                                        height={100}
                                        alt="Agent"
                                    />
                                    <div className="flex items-center justify-center gap-x-1 absolute bottom-3 w-full">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <FaStar
                                                key={num}
                                                className="flex-shrink-0"
                                                color="#fde047"
                                                size={16}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="p-2.5 space-y-2">
                                    <span className="text-lg font-semibold line-clamp-1 text-center">
                                        {agent.name}
                                    </span>
                                    <span className="text-sm line-clamp-1 text-center">
                                        Fee: {formatPrice(agent.fee)}
                                    </span>
                                    <button className="rounded-md py-2 w-full text-white bg-defaultBlue hover:bg-defaultBlueHover font-semibold text-sm">
                                        Request
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
