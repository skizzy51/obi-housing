import TopNavbar from "@/components/TopNavbar"
import Image from "next/image"
import signUpImage from "../images/pointing-at-sign.png"
import landingImage from "../images/landing-page-house.png"
import secondLandingCharacter from "../images/second-landing-character.svg"
import thirdLandingCharacter from "../images/third-landing-character.png"
import fourthLandingCharacter from "../images/fourth-landing-character.png"
import fifthLandingCharacter from "../images/fifth-landing-character.png"
import fifthLandingBg from "../images/fifth-landing-bg.png"
import landingAgent from "../images/landing-agent.png"
import logo from "../images/obi-housing-logo.svg"
import { FaArrowRight, FaLocationDot } from "react-icons/fa6"
import Link from "next/link"

export default function Home() {
    return (
        <main className="">
            <TopNavbar />

            {/* first section */}
            <section className="h-screen w-full flex justify-center relative">
                <div className="w-[85%] h-full">
                    <div className="flex flex-col justify-center max-w-[50%] gap-y-3 h-full">
                        <p className="italic mt-16">
                            Housing in Nigeria made EASY!
                        </p>
                        <h1 className="text-5xl font-extrabold leading-[4.5rem]">
                            Buy and Sell properties with little to no effort.
                        </h1>
                        <p className="text-sm opacity-70">
                            Do you have problems finding buyers for your
                            properties? Tired of having to deal with unreliable
                            agents and unnecessarily expensive prices and fees
                            to acquire a home in Nigeria? The solution to your
                            problems have nimport Link from "next/link"ever been
                            made easier.
                        </p>
                        <div className="relative flex-shrink-0">
                            <Image
                                className=""
                                src={signUpImage}
                                alt="Sign-up"
                            />
                            <button className="bg-defaultBlue absolute bottom-[4px] left-5 -z-10 flex-shrink-0 text-white h-[3.5rem] w-[17rem] rounded-md text-sm">
                                Sign Up
                            </button>
                            <Link
                                href={{ pathname: "/sign-in" }}
                                className="bg-red-400"
                            >
                                <button className="absolute bottom-[4px] left-5 z-10 flex-shrink-0 text-white h-[3.5rem] w-[17rem]"></button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Image
                    className="absolute bottom-0 right-0 -z-20"
                    src={landingImage}
                    width={900}
                    alt="landing"
                />
            </section>

            {/* second section */}
            <section className="h-screen w-full bg-white">
                <div className="w-[92.5%] h-full flex">
                    <div className="basis-[45%] second-landing-image bg-no-repeat"></div>

                    <div className="flex-1 second-landing-bg">
                        <div className="mt-32">
                            <h2 className="text-3xl text-end font-bold">
                                Own your dream home
                            </h2>
                            <p className="text-xs text-end max-w-[70%] ml-auto mt-3">
                                Explore a wide range of properties for sale,
                                including houses, apartments, condos, and more.
                                Our platform provides detailed listings, helpful
                                filters, and expert advice to assist you in
                                finding the perfect property to purchase.
                            </p>
                        </div>

                        <div className="relative flex flex-col items-end translate-y-10">
                            <Image
                                className="flex-shrink-0 w-[180px] z-10"
                                src={secondLandingCharacter}
                                alt="Obi"
                            />
                            <Link
                                href={{ pathname: "/properties" }}
                                className="z-10 flex justify-center bg-defaultBlue flex-shrink-0 mt-5 text-white py-4 w-[15rem] rounded-md text-sm font-medium"
                            >
                                View Properties
                            </Link>

                            <div className="flex flex-col gap-y-5 absolute right-[17%] bottom-[5rem]">
                                <div className="w-[400px] font-medium bottom-[50%] left-[2rem] rounded-xl bg-[#C8FBFF] p-5 px-9 text-center text-xs shadow-[7px_7px_20px_6px_#c7c7c7]">
                                    Benefit from expert advice and guidance from
                                    our real estate professionals who can assist
                                    you throughout the buying process, from
                                    property selection to closing.
                                </div>
                                <div className="w-[400px] font-medium -top-[4.5rem] rounded-xl bg-white p-5 px-9 text-center text-xs shadow-[7px_7px_20px_6px_#c7c7c7]">
                                    Use advanced filters such as price range,
                                    property type, size, amenities, and more to
                                    narrow down your search and find the perfect
                                    home.
                                </div>

                                <div className="w-[400px] font-medium bottom-[50%] right-[2rem] rounded-xl bg-[#C8FBFF] p-5 px-9 text-center text-xs shadow-[7px_7px_20px_6px_#c7c7c7]">
                                    Access comprehensive property listings with
                                    detailed descriptions, high-quality images,
                                    and virtual tours to help you make informed
                                    decisions.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* third section */}
            <section className="h-screen w-full">
                <div className="w-[92.5%] h-full flex ml-auto">
                    <div className="flex-1 relative flex flex-col">
                        <h2 className="text-3xl mt-[8rem] font-bold">
                            List Your Property for sale
                        </h2>

                        <div className="flex flex-col gap-y-14 flex-1 mt-14">
                            <div className="w-[470px] py-7 px-5 text-xs border-l-[10px] border-l-defaultBlue bg-white shadow-[7px_7px_20px_6px_#0000003b]">
                                Showcase your property to a wide audience of
                                potential buyers through our platform, reaching
                                individuals actively looking to purchase homes
                            </div>
                            <div className="w-[470px] py-7 px-5 translate-x-10 text-xs border-r-[10px] border-r-defaultBlue bg-white shadow-[7px_7px_20px_6px_#0000003b]">
                                Get accurate property valuations and market
                                insights to determine the optimal selling price
                                and maximize your returns.
                            </div>
                            <div className="w-[470px] py-7 px-5 text-xs border-l-[10px] border-l-defaultBlue bg-white shadow-[7px_7px_20px_6px_#0000003b]">
                                Receive personalized support from our
                                experienced real estate agents who will handle
                                inquiries, negotiations, and paperwork to
                                streamline the selling process.
                            </div>
                        </div>
                        <Image
                            className="flex-shrink-0 z-10 absolute bottom-0 right-0 w-[270px]"
                            src={thirdLandingCharacter}
                            alt="Obi"
                        />
                    </div>

                    <div className="basis-[45%] third-landing-image"></div>
                </div>
            </section>

            {/* fourth section */}
            <section className="h-screen w-full bg-white flex flex-col fourth-landing-image">
                <div className="flex-shrink-0 basis-[50%] opacity-0"></div>

                <div className="w-full flex-1 bg-white/90">
                    <div className="h-full w-[85%] mx-auto flex justify-between items-center relative">
                        <Image
                            className="flex-shrink-0 z-10 absolute bottom-0 w-[250px]"
                            src={fourthLandingCharacter}
                            alt="Obi"
                        />

                        <div className="flex flex-col gap-y-5 ml-auto max-w-[60%] text-end">
                            <h2 className="text-3xl font-bold">
                                Find Your Ideal Rental
                            </h2>
                            <p className="flex-shrink-0 text-sm">
                                Explore a diverse range of rental properties,
                                including apartments, houses, vacation rentals,
                                and more, tailored to your specific preferences
                                and requirements.
                            </p>
                            <p className="flex-shrink-0 text-sm">
                                Use location-based search tools to find rentals
                                in desired neighborhoods or proximity to
                                schools, workplaces, amenities, and
                                transportation.
                            </p>
                            <p className="flex-shrink-0 text-sm">
                                Discover both short-term and long-term rental
                                options, with flexible lease terms and amenities
                                to suit your lifestyle.
                            </p>
                            <Link
                                href={{ pathname: "/properties" }}
                                className="bg-defaultBlue w-fit ml-auto flex-shrink-0 text-white py-2.5 px-6 rounded-md text-sm"
                            >
                                View Rentals
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* fifth section */}
            <section className="h-screen w-full">
                <div className="w-[92.5%] h-full flex ml-auto">
                    <div className="basis-[50%]">
                        <h2 className="text-3xl font-bold mt-[8rem]">
                            Become an Agent
                        </h2>
                        <div className="flex flex-col gap-y-7 mt-8">
                            <div className="w-[500px] py-4 px-5 text-xs border-l-[10px] border-l-defaultBlue bg-white shadow-[7px_7px_20px_6px_#0000003b]">
                                Explore opportunities to become a real estate
                                agent and join our dynamic team of professionals
                                dedicated to delivering exceptional service to
                                clients.
                            </div>
                            <div className="w-[500px] py-4 px-5 text-xs border-r-[10px] border-r-defaultBlue bg-white shadow-[7px_7px_20px_6px_#0000003b] translate-x-5">
                                Participate in comprehensive training programs
                                and workshops designed to enhance your skills,
                                knowledge, and expertise in the real estate
                                industry.
                            </div>
                            <div className="w-[500px] py-4 px-5 text-xs border-l-[10px] border-l-defaultBlue bg-white shadow-[7px_7px_20px_6px_#0000003b]">
                                Benefit from competitive commission structures
                                and incentives, rewarding your hard work and
                                dedication in assisting clients with buying,
                                selling, or renting properties.
                            </div>
                            <div className="w-[500px] py-4 px-5 text-xs border-r-[10px] border-r-defaultBlue bg-white shadow-[7px_7px_20px_6px_#0000003b] translate-x-5">
                                Experience a supportive and collaborative work
                                environment with access to resources, tools, and
                                mentorship to help you thrive and achieve
                                success as a real estate agent.
                            </div>
                        </div>

                        <Link href={{ pathname: "/sign-in" }}>
                            <button className="bg-defaultBlue flex-shrink-0 text-white py-2.5 w-[10rem] mx-auto mt-10 rounded-md text-sm">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                    <div className="basis-[50%] relative">
                        <Image
                            className="flex-shrink-0 z-10 absolute bottom-0"
                            src={fifthLandingCharacter}
                            alt="Obi"
                        />
                        <Image
                            className="flex-shrink-0 z-0 absolute top-0"
                            src={fifthLandingBg}
                            alt="Obi"
                        />
                    </div>
                </div>
            </section>

            {/* sixth section */}
            <section className="w-full bg-white pt-[8rem] relative">
                <footer className="w-full py-36 bg-[#6E6E6E] absolute top-[95%]">
                    <div className="w-[85%] mx-auto flex justify-between gap-x-[13rem]">
                        <Image
                            className="flex-shrink-0 w-[15rem]"
                            src={logo}
                            alt="Logo"
                        />

                        <div className="flex-1">
                            <p className="text-white max-w-[90%] mx-auto text-center font-medium leading-9">
                                Welcome to Obi Housing, where our goal is to
                                connect buyers with their dream homes, assist
                                sellers in achieving optimal returns, and
                                provide seamless rental experiences. Join us in
                                shaping the future of real estate through
                                expertise, innovation, and exceptional service.
                            </p>

                            <div className="grid grid-cols-4 gap-y-10 gap-x-10 mt-10 text-white place-content-center">
                                {[1, 2, 3, 4].map((num) => {
                                    return (
                                        <div
                                            key={num}
                                            className="px-5 py-3 border border-white flex justify-center"
                                        >
                                            <span className="italic font-bold">
                                                Sponsor
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </footer>

                <div className="w-[85%] mx-auto z-10 relative">
                    <div className="flex justify-center items-baseline relative">
                        <h2 className="text-4xl text-center font-bold">
                            Meet a few of our Agents
                        </h2>
                        <Link
                            href={{ pathname: "/agents" }}
                            className="flex items-center text-sm cursor-pointer hover:underline gap-x-1 absolute right-0 bottom-0"
                        >
                            Explore more <FaArrowRight />
                        </Link>
                    </div>

                    <div className="w-full flex justify-between items-center mt-[3rem]">
                        {[1, 2, 3].map((val) => {
                            return (
                                <div
                                    key={val}
                                    className="flex flex-col flex-shrink-0 bg-white h-[30rem] w-[21rem] shadow-[10px_10px_20px_0px_#b3b3b3]"
                                >
                                    <Image
                                        className="flex-shrink-0 w-[inherit]"
                                        src={landingAgent}
                                        alt="Agent"
                                    />
                                    <div className="flex-1 px-5 py-5 flex flex-col justify-between">
                                        <b className="text-2xl text-center truncate">
                                            Stanley Francis
                                        </b>
                                        <div className="flex gap-x-3 items-center">
                                            <FaLocationDot />{" "}
                                            <span className="truncate">
                                                Ojuelegba, Lagos
                                            </span>
                                        </div>
                                        <p className="font-semibold opacity-50 text-sm">
                                            500+ properties dealt
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}
