import mongoose from "mongoose"

const mongoUrl = process.env.MONGOOSE_URI

export const connect = async () => {
    const connectionState = mongoose.connection.readyState

    if (connectionState === 1) {
        console.log("Already connected")
        return
    }

    if (connectionState === 2) {
        console.log("Connecting...")
        return
    }

    try {
        mongoose.connect(mongoUrl!, {
            bufferCommands: false,
        })
        console.log("Database Connected")
    } catch (error) {
        console.log(`Error connecting to database: ${error}`)
        throw new Error("Error connecting to database")
    }
}
