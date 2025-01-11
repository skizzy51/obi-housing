"use client"
import Image from "next/image"
import FirstCharacter from "../../images/BAgent-character.png"
import SecondCharacter from "../../images/BAgent-character-2.png"
import FirstBackground from "../../images/BAgent-bg.png"
import SecondBackground from "../../images/BAgent-bg-2.png"
import { motion } from "framer-motion"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useState } from "react"
import { FaImage, FaTrash } from "react-icons/fa6"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { becomeAnAgent } from "@/redux/reducer"
import { toast } from "react-toastify"
import { BeatLoader } from "react-spinners"

export default function Page() {
    const { data: session, status } = useSession()
    const { loading } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const [phase, setPhase] = useState(1)
    const [experience, setExperience] = useState("")
    const [language, setLanguage] = useState("")
    const [location, setLocation] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [aboutMe, setAboutMe] = useState("")
    const [image, setImage] = useState<File>({} as File)
    const [fileActive, setFileActive] = useState(false)
    const [fee, setFee] = useState("")
    const [uploadLoading, setUploadLoading] = useState(false)

    function Apply() {
        if (isNaN(experience as any))
            return toast.error(
                "Minimum 3 characters required for experience field"
            )
        else if (language.length < 3)
            return toast.error(
                "Minimum 3 characters required for language field"
            )
        else if (location.length < 3)
            return toast.error(
                "Minimum 3 characters required for location field"
            )
        else if (specialization.length < 3)
            return toast.error(
                "Minimum 3 characters required for specialization field"
            )
        else if (aboutMe.length < 3)
            return toast.error(
                "Minimum 3 characters required for about me field"
            )
        else if (isNaN(fee as any))
            return toast.error("Fee must be a valid number")
        else if (!fileActive) return toast.error("Profile picture required")

        setUploadLoading(true)
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
                if (res) {
                    setUploadLoading(false)
                    const { url } = res
                    dispatch(
                        becomeAnAgent({
                            token: session?.user.accessToken,
                            data: {
                                profileImage: url,
                                aboutMe,
                                experience,
                                specialization,
                                language,
                                fee,
                                location,
                            },
                        })
                    )
                } else {
                    toast.error(`Error uploading image`)
                }
            })
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    }

    return (
        <>
            {loading ? (
                <div className="h-screen w-screen fixed top-0 left-0 z-50 flex flex-col text-white justify-center items-center bg-black/40">
                    <BeatLoader color="white" size={30} />
                    {uploadLoading && (
                        <h3 className="text-2xl font-semibold">
                            Uploading Profile picture
                        </h3>
                    )}
                </div>
            ) : null}
            {phase === 1 ? (
                <div className="w-full h-screen flex bg-defaultBlue">
                    <div className="relative basis-[55%] flex justify-center overflow-hidden">
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.2 }}
                            transition={{
                                duration: 3,
                                delay: 1,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatDelay: 0,
                                repeatType: "reverse",
                            }}
                            className="w-full h-full absolute top-0"
                        >
                            <Image
                                src={FirstBackground}
                                className="w-full h-full"
                                alt="backgrond"
                            />
                        </motion.div>
                        <Image
                            src={FirstCharacter}
                            className="w-auto h-[90%] absolute bottom-0 flex-shrink-0 z-10"
                            alt="salesman"
                        />
                    </div>

                    <div className="basis-[45%] relative text-white px-8 flex flex-col items-center justify-center">
                        <h1 className="text-5xl font-bold">Become an Agent</h1>
                        <Carousel
                            arrows
                            centerMode={false}
                            className="max-w-[40rem] mt-10"
                            containerClass="container"
                            dotListClass="!bottom-20"
                            focusOnSelect={false}
                            itemClass=""
                            renderButtonGroupOutside
                            renderDotsOutside
                            responsive={responsive}
                            rtl={false}
                            showDots
                            sliderClass=""
                            customLeftArrow={
                                <button className="rounded-full absolute bg-black/20 p-2.5">
                                    <FaChevronLeft />
                                </button>
                            }
                            customRightArrow={
                                <button className="rounded-full absolute right-0 bg-black/20 p-2.5">
                                    <FaChevronRight />
                                </button>
                            }
                        >
                            <div className="">
                                <h3 className="text-xl font-bold text-center mb-5">
                                    Why Choose us?
                                </h3>
                                <div className="max-w-[80%] flex flex-col gap-y-4 text-center mx-auto">
                                    <p>
                                        <b>Advanced Training Programs:</b>{" "}
                                        Enhance your skills with our
                                        comprehensive training sessions.
                                    </p>
                                    <p>
                                        <b>Cutting-Edge Technology:</b> Utilize
                                        our state-of-the-art tools and resources
                                        to streamline your workflow.
                                    </p>
                                    <p>
                                        <b>Extensive Network:</b> Tap into our
                                        vast network of clients and partners to
                                        boost your career.
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <h3 className="text-xl font-bold text-center mb-5">
                                    Who We Are Looking For
                                </h3>
                                <div className="max-w-[80%] flex flex-col gap-y-4 text-center mx-auto">
                                    <p>
                                        <b>Real Estate Experience: </b> Prior
                                        experience in the real estate industry
                                        is a plus.
                                    </p>
                                    <p>
                                        <b>Customer-Centric Approach: </b>A
                                        strong focus on delivering exceptional
                                        customer service.
                                    </p>
                                    <p>
                                        <b>Excellent Communication Skills:</b>{" "}
                                        The ability to communicate effectively
                                        and build relationships.
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <h3 className="text-xl font-bold text-center mb-5">
                                    Benefits of Joining Us
                                </h3>
                                <div className="max-w-[80%] flex flex-col gap-y-4 text-center mx-auto">
                                    <p>
                                        <b>Competitive Commission Structure:</b>{" "}
                                        Enjoy a rewarding commission-based
                                        income.
                                    </p>
                                    <p>
                                        <b>Flexible Working Hours:</b> Achieve a
                                        perfect work-life balance with our
                                        flexible scheduling.
                                    </p>
                                    <p>
                                        <b>Career Growth Opportunities:</b> Grow
                                        your career with our continuous
                                        development and promotion prospects.
                                    </p>
                                    <button
                                        onClick={() => {
                                            if (status === "unauthenticated")
                                                return router.push("/sign-in")
                                            setPhase(2)
                                        }}
                                        className="rounded py-2 text-sm w-[35%] mx-auto mt-6 font-semibold bg-white text-defaultBlue"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
            ) : (
                <div className="w-full h-screen flex bg-white">
                    <div className="basis-[55%] relative flex justify-center overflow-hidden bg-gradient-to-r from-[#2D88FF] to-white">
                        <Image
                            src={SecondBackground}
                            className="w-auto h-[70%] absolute top-10"
                            alt="backgrond"
                        />
                        <Image
                            src={SecondCharacter}
                            className="w-auto h-[90%] absolute bottom-0 flex-shrink-0 z-10"
                            alt="salesman"
                        />
                    </div>
                    <div className="basis-[45%] flex justify-center items-center">
                        <div className="w-[70%] h-[85%] flex flex-col gap-y-5">
                            <h1 className="text-3xl font-bold text-center">
                                Upload Resume and Apply
                            </h1>
                            <div className="custom-scrollbar-low-opacity flex-1 overflow-y-auto flex flex-col gap-y-7 mt-3">
                                <div>
                                    <label className="text-defaultBlue ml-3 mb-2 font-semibold">
                                        Experience:
                                    </label>
                                    <div className="flex gap-x-3 items-stretch pr-2">
                                        <input
                                            type="text"
                                            maxLength={2}
                                            pattern="[0-5]?[0-9]"
                                            value={experience}
                                            onChange={(e) =>
                                                setExperience(
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    )
                                                )
                                            }
                                            className="rounded-md py-2 px-3 text-sm w-full bg-defaultBlue/10 outline-none"
                                        />
                                        <span className="text-sm flex items-center">
                                            Year(s)
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-defaultBlue ml-3 mb-2 font-semibold">
                                        Language:
                                    </label>
                                    <input
                                        type="text"
                                        value={language}
                                        onChange={(e) =>
                                            setLanguage(e.target.value)
                                        }
                                        className="rounded-md py-2 px-3 text-sm w-full bg-defaultBlue/10 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-defaultBlue ml-3 mb-2 font-semibold">
                                        Location:
                                    </label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                        className="rounded-md py-2 px-3 text-sm w-full bg-defaultBlue/10 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-defaultBlue ml-3 mb-2 font-semibold">
                                        Specialization:
                                    </label>
                                    <input
                                        type="text"
                                        value={specialization}
                                        onChange={(e) =>
                                            setSpecialization(e.target.value)
                                        }
                                        className="rounded-md py-2 px-3 text-sm w-full bg-defaultBlue/10 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-defaultBlue ml-3 mb-2 font-semibold">
                                        About Me(Bio):
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={aboutMe}
                                        onChange={(e) =>
                                            setAboutMe(e.target.value)
                                        }
                                        className="custom-scrollbar-low-opacity resize-none rounded-md py-2 px-3 text-sm w-full bg-defaultBlue/10 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-defaultBlue ml-3 mb-2 font-semibold">
                                        Fee(₦ - Naira):
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={12}
                                        pattern="[0-5]?[0-9]"
                                        value={fee}
                                        onChange={(e) => {
                                            setFee(
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                )
                                            )
                                        }}
                                        className="rounded-md py-2 px-3 text-sm w-full bg-defaultBlue/10 outline-none"
                                    />
                                </div>
                                {fileActive ? (
                                    <div className="w-full h-[10rem] relative flex justify-center flex-shrink-0 bg-defaultBlue/10">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Profile pic"
                                            className="h-full w-auto"
                                        />
                                        <button
                                            onClick={() => {
                                                setFileActive(false)
                                                setImage({} as File)
                                            }}
                                            className="absolute top-3 right-3 rounded-full p-2 bg-white"
                                        >
                                            <FaTrash
                                                color="#ef4444"
                                                size={16}
                                            />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() =>
                                            document
                                                .getElementById("profile-pic")
                                                ?.click()
                                        }
                                        className="rounded-md flex flex-col gap-y-4 justify-center items-center h-[10rem] w-full bg-defaultBlue/10 flex-shrink-0 cursor-pointer"
                                    >
                                        <FaImage size={60} color="#2d88ff" />
                                        <span className="text-defaultBlue font-bold">
                                            Upload picture
                                        </span>
                                    </button>
                                )}
                                <input
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            if (e.target.files?.length > 0) {
                                                setFileActive(true)
                                                setImage(e.target.files[0])
                                            }
                                        }
                                    }}
                                    hidden
                                    accept=".jpg, .jpeg, .png, .svg, .jfif"
                                    type="file"
                                    id="profile-pic"
                                />
                            </div>
                            <button
                                onClick={Apply}
                                className="w-full py-2 text-white font-semibold bg-defaultBlue hover:bg-defaultBlueHover rounded-md"
                            >
                                Submit application
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
