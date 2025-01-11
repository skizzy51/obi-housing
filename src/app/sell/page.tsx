"use client"
import Image from "next/image"
import Character from "../../images/sell-character.png"
import Bg from "../../images/sell-bg.png"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Page() {
    return (
        <div className="w-full h-screen flex relative justify-center items-center">
            <motion.div
                initial={{ y: "100vh" }}
                animate={{ y: "0" }}
                className="h-[80%] absolute bottom-0 z-20"
            >
                <Image
                    className="h-full w-auto"
                    src={Character}
                    alt="Character"
                />
            </motion.div>
            <Image
                className="h-full w-auto absolute top-0 z-0"
                src={Bg}
                alt="Character"
            />
            <motion.div
                initial={{ x: "-100vw", transitionTimingFunction: "linear" }}
                animate={{ x: "0", transitionTimingFunction: "linear" }}
                transition={{ duration: 1 }}
                className="w-full h-[70%] flex justify-between items-center px-20 bg-white z-10"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    className="flex flex-col max-w-[30%] gap-y-3 text-black/60"
                >
                    <h1 className="text-5xl font-bold text-black line-clamp-3">
                        Sell Your Property with Ease
                    </h1>
                    <p className="mt-4">
                        We utilize a wide range of marketing channels to
                        showcase your property to a large audience.
                    </p>
                    <p>
                        Schedule a free property evaluation with our expert
                        agents.
                    </p>
                    <p>
                        Sign a listing agreement and let us take care of the
                        rest.
                    </p>
                    <Link
                        href={{ pathname: "/sell/listing/sell" }}
                        className="font-semibold w-[50%] flex justify-center py-2.5 mt-4 rounded-md bg-defaultBlue text-white"
                    >
                        Sell
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    className="flex flex-col max-w-[30%] gap-y-3 text-right text-black/60"
                >
                    <h1 className="text-5xl font-bold text-defaultBlue line-clamp-3">
                        List Your Property for Rent or Lease
                    </h1>
                    <p className="mt-4">
                        We conduct thorough background checks to ensure reliable
                        and trustworthy tenants.
                    </p>
                    <p>
                        We ensure all lease agreements and rental processes
                        comply with local regulations.
                    </p>
                    <p>
                        From maintenance to rent collection, we offer
                        comprehensive property management services.
                    </p>
                    <Link
                        href={{ pathname: "/sell/listing/rent" }}
                        className="font-semibold w-[50%] flex justify-center ml-auto py-2.5 mt-4 rounded-md whitespace-nowrap bg-transparent text-defaultBlue border border-defaultBlue"
                    >
                        Rent / Lease
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}
