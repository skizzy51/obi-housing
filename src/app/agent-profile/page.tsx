import Image from "next/image"
import agent from "../../images/landing-agent.png"
import { FaBath, FaLocationDot, FaStar, FaBed } from "react-icons/fa6"
import img1 from "../../images/dashboard1.jpg"
import { TbRulerMeasure } from "react-icons/tb"

export default function Page() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex gap-x-10 w-[90%] h-[87%] bg-white shadow-[7px_7px_19px_0px_#00000024]">
                <div className="basis-[35%] flex flex-col items-center">
                    <div className="w-[20rem] h-[20rem] relative flex flex-col items-center flex-shrink-0">
                        <Image
                            src={agent}
                            className="h-full w-full absolute -top-5 object-cover rounded-full"
                            alt="Agent profile"
                        />
                        <div className="absolute bottom-0 flex gap-x-2 mx-auto">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <FaStar
                                    size={40}
                                    color="#EFFF00"
                                    className="flex-shrink-0"
                                />
                            ))}
                        </div>
                    </div>

                    <h3 className="font-semibold text-xl mt-7">About Me:</h3>
                    <p className="text-center max-w-[85%] text-sm opacity-50 mt-1.5">
                        As a dedicated real estate professional, I am passionate
                        about helping clients achieve their real estate goals
                        and dreams. With a strong focus on integrity,
                        transparency, and personalized service, I strive to
                        provide an exceptional experience for every client,
                        whether buying, selling, or investing in properties. My
                        goal is to build long-lasting relationships based on
                        trust, professionalism, and successful outcomes.
                    </p>
                </div>

                <div className="flex-1 flex flex-col py-5 pr-5">
                    <h1 className="capitalize text-4xl font-bold">
                        Stanley Francis
                    </h1>
                    <p className="mt-2">stanleyfrancis@gmail.com</p>

                    <div className="flex flex-wrap gap-x-10 gap-y-6 mt-7">
                        <b className="text-sm">
                            Experience:{" "}
                            <span className="opacity-30">6 years</span>
                        </b>
                        <b className="text-sm">
                            Specialization:{" "}
                            <span className="opacity-30">
                                Residential, commercial
                            </span>
                        </b>
                        <b className="text-sm">
                            Language(s):{" "}
                            <span className="opacity-30">English, french</span>
                        </b>
                        <b className="text-sm">
                            Fee: <span className="opacity-30">$200,000</span>
                        </b>
                        <b className="text-sm">
                            Deals closed:{" "}
                            <span className="opacity-30">20+</span>
                        </b>
                        <b className="text-sm">
                            Location:{" "}
                            <span className="opacity-30">Lagos Nigeria</span>
                        </b>
                    </div>

                    <h5 className="mt-10 text-lg font-semibold">
                        Properties managed:
                    </h5>
                    <div className="custom-scrollbar-low-opacity flex-1 mt-3 pb-4 overflow-y-auto grid grid-cols-3 gap-x-5 gap-y-5">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div
                                key={num}
                                className="h-[20rem] shadow-[7px_7px_19px_0px_#00000024] rounded-lg flex flex-col cursor-pointer bg-white"
                            >
                                <div className="w-full h-[65%] relative flex-shrink-0">
                                    <Image
                                        src={img1}
                                        className="h-full w-full object-fill rounded-t-lg bg-gray-500"
                                        alt="House"
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs font-medium bg-gray-300 px-2 py-1 rounded">
                                        ₦ 200,000,000
                                    </div>
                                    <div className="absolute top-3 right-3 text-sm font-medium bg-defaultBlue text-white px-2 py-1 rounded">
                                        Rent
                                    </div>
                                </div>

                                <div className="p-2.5 flex-1 flex flex-col justify-between">
                                    <div className="flex gap-x-2 items-center flex-shrink-0">
                                        <FaLocationDot
                                            size={17}
                                            className="flex-shrink-0"
                                        />
                                        <span className="text-sm truncate">
                                            Anthony Village, Lagos
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center overflow-x-hidden gap-x-1.5 flex-shrink-0">
                                        <div className="flex gap-x-1.5 items-center bg-gray-200 p-2 px-2.5 rounded">
                                            <FaBed
                                                color="#FAC853"
                                                className="flex-shrink-0"
                                            />
                                            <span className="text-sm">5</span>
                                        </div>
                                        <div className="flex gap-x-1.5 items-center bg-gray-200 p-2 px-2.5 rounded">
                                            <FaBath
                                                color="#2D88FF"
                                                className="flex-shrink-0"
                                            />
                                            <span className="text-sm">5</span>
                                        </div>
                                        <div className="flex gap-x-1.5 items-center bg-gray-200 p-2 px-2.5 rounded">
                                            <TbRulerMeasure
                                                color="#712B05"
                                                className="flex-shrink-0"
                                            />
                                            <span className="text-sm truncate">
                                                5 plots
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
