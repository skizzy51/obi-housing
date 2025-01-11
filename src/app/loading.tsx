"use client"
import { BeatLoader } from "react-spinners"

export default function Loading() {
    return (
        <div className="h-screen w-screen bg-black/40 top-0 left-0 flex justify-center items-center z-[9999]">
            <BeatLoader size={25} color="white" />
        </div>
    )
}
