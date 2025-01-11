"use client"

import Image from "next/image"
import logo from "../../images/obi-housing-logo.svg"
import Obi from "../../images/sign-in-character.png"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import googleIcon from "../../images/google-icon.svg"
import githubIcon from "../../images/github-logo.svg"
import { toast } from "react-toastify"
import { baseUrl } from "@/redux/reducer"
import { BeatLoader, HashLoader } from "react-spinners"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

export default function Page() {
    const { data: session, status: sessionStatus } = useSession()
    const [signUp, setSignUp] = useState(true)
    const [username, setUsername] = useState("")
    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPassword1, setSignUpPassword1] = useState("")
    const [signUpPassword2, setSignUpPassword2] = useState("")
    const [signInEmail, setSignInEmail] = useState("")
    const [signInPassword, setSignInPassword] = useState("")
    const [togglePasswordShow, setTogglePasswordShow] = useState({
        signUp1: false,
        signUp2: false,
        signIn1: false,
    })
    const router = useRouter()

    async function handleSignIn() {
        if (!isValidEmail(signInEmail)) {
            return toast.error("Invalid email format")
        }
        const res = await signIn("credentials", {
            redirect: false,
            email: signInEmail,
            password: signInPassword,
            authType: "login",
            username: "",
        })
        if (res?.ok) {
            router.replace("/dashboard")
        } else {
            toast.error("Invalid email or password")
        }
    }

    async function handleSignUp() {
        if (!isValidEmail(signUpEmail))
            return toast.error("Invalid email format")
        if (signUpPassword1 !== signUpPassword2)
            return toast.error("Passwords do not match")
        if (
            signUpPassword1.trim().length < 3 ||
            signUpPassword2.trim().length < 3
        )
            return toast.error("Passwords must be more than 3 characters")

        const res = await signIn("credentials", {
            redirect: false,
            email: signUpEmail,
            password: signUpPassword1,
            authType: "signUp",
            username,
        })
        if (res?.ok) {
            router.replace("/dashboard")
        }

        // let response = await fetch(`${baseUrl}/sign-up`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         email: signUpEmail,
        //         password: signUpPassword1,
        //         name: username,
        //     }),
        //     headers: { "Content-Type": "application/json" },
        // }).then((res) => res.json())
        // if (response?.message === "Successfully created") {
        //     const res = await signIn("credentials", {
        //         redirect: false,
        //         email: signUpEmail,
        //         password: signUpPassword1,
        //     })
        //     if (res?.ok) {
        //         router.replace("/dashboard")
        //     } else {
        //         toast.error("Error creating user")
        //     }
        // } else {
        //     toast.error(response.message)
        // }
    }

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/dashboard")
        }
    }, [sessionStatus, router])

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return emailRegex.test(email)
    }

    return (
        <div className="w-screen h-screen flex flex-col py-6 gap-y-5">
            {sessionStatus === "loading" && (
                <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/50 flex justify-center items-center">
                    <HashLoader size={40} color="white" />
                </div>
            )}
            <div className="w-full flex justify-center flex-shrink-0">
                <Link href={{ pathname: "/" }}>
                    <Image
                        src={logo}
                        className="flex-shrink-0 w-[5.5rem] cursor-pointer"
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className="w-[85%] flex-1 flex mx-auto">
                <div className="basis-[45%] bg-gradient-to-br from-[#2D88FF] to-[#001531] relative">
                    <Image
                        src={Obi}
                        className="absolute bottom-0 -right-[15%] h-[110%] w-auto flex-shrink-0"
                        alt="Obi"
                    />
                </div>
                <div className="flex-1 bg-white flex justify-center items-center">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="w-[55%] h-[90%] flex flex-col justify-between"
                    >
                        <h2 className="text-3xl font-semibold text-center">
                            Sign Up
                        </h2>

                        {signUp ? (
                            <div className="flex-1 flex flex-col justify-center gap-y-2 py-4">
                                <div>
                                    <label className="text-sm ml-2.5">
                                        Name:{" "}
                                        <span className="opacity-50">
                                            (FirstName and LastName)
                                        </span>
                                    </label>
                                    <input
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        type="text"
                                        className="w-full text-sm mt-1.5 p-2 px-4 outline-none bg-[#2D88FF]/[11%]"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm ml-2.5">
                                        Email:
                                    </label>
                                    <input
                                        value={signUpEmail}
                                        onChange={(e) =>
                                            setSignUpEmail(e.target.value)
                                        }
                                        type="email"
                                        className="w-full text-sm mt-1.5 p-2 px-4 outline-none bg-[#2D88FF]/[11%]"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm ml-2.5">
                                        Password:
                                    </label>
                                    <div className="w-full mt-1.5 px-4 bg-[#2D88FF]/[11%] flex items-stretch">
                                        <input
                                            value={signUpPassword1}
                                            onChange={(e) => {
                                                const updatedValue =
                                                    e.target.value.replace(
                                                        /\s/g,
                                                        ""
                                                    )
                                                setSignUpPassword1(updatedValue)
                                            }}
                                            type={
                                                !togglePasswordShow.signUp1
                                                    ? "password"
                                                    : "text"
                                            }
                                            className="w-full py-2 text-sm outline-none bg-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setTogglePasswordShow({
                                                    signUp1:
                                                        !togglePasswordShow.signUp1,
                                                    signUp2:
                                                        togglePasswordShow.signUp2,
                                                    signIn1:
                                                        togglePasswordShow.signIn1,
                                                })
                                            }
                                            className="flex-shrink-0"
                                        >
                                            {!togglePasswordShow.signUp1 ? (
                                                <FaRegEye
                                                    size={20}
                                                    color="#2d88ff"
                                                />
                                            ) : (
                                                <FaRegEyeSlash
                                                    size={20}
                                                    color="#2d88ff"
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm ml-2.5">
                                        Confirm Password:
                                    </label>
                                    <div className="w-full mt-1.5 px-4 bg-[#2D88FF]/[11%] flex items-stretch">
                                        <input
                                            value={signUpPassword2}
                                            onChange={(e) => {
                                                const updatedValue =
                                                    e.target.value.replace(
                                                        /\s/g,
                                                        ""
                                                    )
                                                setSignUpPassword2(updatedValue)
                                            }}
                                            type={
                                                !togglePasswordShow.signUp2
                                                    ? "password"
                                                    : "text"
                                            }
                                            className="w-full py-2 text-sm outline-none bg-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setTogglePasswordShow({
                                                    signUp1:
                                                        togglePasswordShow.signUp1,
                                                    signUp2:
                                                        !togglePasswordShow.signUp2,
                                                    signIn1:
                                                        togglePasswordShow.signIn1,
                                                })
                                            }
                                            className="flex-shrink-0"
                                        >
                                            {!togglePasswordShow.signUp2 ? (
                                                <FaRegEye
                                                    size={20}
                                                    color="#2d88ff"
                                                />
                                            ) : (
                                                <FaRegEyeSlash
                                                    size={20}
                                                    color="#2d88ff"
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center flex-nowrap gap-x-2.5">
                                    <span className="text-xs">
                                        Sign Up with:
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => signIn("google")}
                                        className="p-1.5 rounded-full cursor-pointer flex-shrink-0 bg-defaultBlueBackground"
                                    >
                                        <Image
                                            className="w-[2rem] h-[2rem]"
                                            src={googleIcon}
                                            alt="google"
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => signIn("github")}
                                        className="p-1.5 rounded-full cursor-pointer flex-shrink-0 bg-defaultBlueBackground"
                                    >
                                        <Image
                                            className="w-[2rem] h-[2rem]"
                                            src={githubIcon}
                                            alt="google"
                                        />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col justify-center gap-y-4 py-8">
                                <div>
                                    <label className="text-sm ml-2.5">
                                        Email:
                                    </label>
                                    <input
                                        value={signInEmail}
                                        onChange={(e) =>
                                            setSignInEmail(e.target.value)
                                        }
                                        type="email"
                                        className="w-full text-sm mt-1.5 p-2 px-4 outline-none bg-[#2D88FF]/[11%]"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm ml-2.5">
                                        Password:
                                    </label>
                                    <div className="w-full mt-1.5 px-4 bg-[#2D88FF]/[11%] flex items-stretch">
                                        <input
                                            value={signInPassword}
                                            onChange={(e) => {
                                                const updatedValue =
                                                    e.target.value.replace(
                                                        /\s/g,
                                                        ""
                                                    )
                                                setSignInPassword(updatedValue)
                                            }}
                                            type={
                                                !togglePasswordShow.signIn1
                                                    ? "password"
                                                    : "text"
                                            }
                                            className="w-full py-2 text-sm outline-none bg-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setTogglePasswordShow({
                                                    signUp1:
                                                        togglePasswordShow.signUp1,
                                                    signUp2:
                                                        togglePasswordShow.signUp2,
                                                    signIn1:
                                                        !togglePasswordShow.signIn1,
                                                })
                                            }
                                            className="flex-shrink-0"
                                        >
                                            {!togglePasswordShow.signIn1 ? (
                                                <FaRegEye
                                                    size={20}
                                                    color="#2d88ff"
                                                />
                                            ) : (
                                                <FaRegEyeSlash
                                                    size={20}
                                                    color="#2d88ff"
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center flex-nowrap gap-x-2.5">
                                    <span className="text-xs">
                                        Sign In with:
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => signIn("google")}
                                        className="p-1.5 rounded-full flex-shrink-0 bg-defaultBlueBackground"
                                    >
                                        <Image
                                            className="w-[2rem] h-[2rem]"
                                            src={googleIcon}
                                            alt="google"
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => signIn("github")}
                                        className="p-1.5 rounded-full flex-shrink-0 bg-defaultBlueBackground"
                                    >
                                        <Image
                                            className="w-[2rem] h-[2rem]"
                                            src={githubIcon}
                                            alt="google"
                                        />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-y-2">
                            {signUp ? (
                                <>
                                    <p className="text-black/50 font-medium text-sm">
                                        Already have an account? &nbsp;
                                        <span
                                            onClick={() => setSignUp(false)}
                                            className="text-defaultBlue !opacity-100 cursor-pointer hover:underline"
                                        >
                                            Sign In
                                        </span>
                                    </p>
                                    <button
                                        type="submit"
                                        onClick={handleSignUp}
                                        className="bg-defaultBlue hover:bg-defaultBlueHover flex-shrink-0 text-white py-2.5 w-full rounded-md font-bold"
                                    >
                                        {sessionStatus === "loading" ? (
                                            <BeatLoader
                                                color="white"
                                                size={10}
                                            />
                                        ) : (
                                            <span>Sign Up</span>
                                        )}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="text-black/50 font-medium text-sm">
                                        Don&apos;t have an account? &nbsp;
                                        <span
                                            onClick={() => setSignUp(true)}
                                            className="text-defaultBlue !opacity-100 cursor-pointer hover:underline"
                                        >
                                            Sign Up
                                        </span>
                                    </p>
                                    <button
                                        type="submit"
                                        onClick={handleSignIn}
                                        className="bg-defaultBlue hover:bg-defaultBlueHover flex-shrink-0 text-white py-2.5 w-full rounded-md font-bold"
                                    >
                                        {sessionStatus === "loading" ? (
                                            <BeatLoader
                                                color="white"
                                                size={10}
                                            />
                                        ) : (
                                            <span>Sign In</span>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
