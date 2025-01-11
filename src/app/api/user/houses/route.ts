import jwt, { JwtPayload } from "jsonwebtoken"
import { connect } from "@/lib/db"
import HouseModel from "@/models/House"
import { NextRequest, NextResponse } from "next/server"
import UserModel from "@/models/User"

interface CustomJwtPayload extends JwtPayload {
    id: string
}

export async function GET(req: NextRequest, res: NextResponse) {
    await connect()
    try {
        // const { id } = jwt.verify(
        //     token,
        //     process.env.CIPHER as string
        // ) as CustomJwtPayload
        // const user = await UserModel.findById(id)
        // if (!user) {
        //     res.status(404).json({ message: "User not found" })
        //     return
        // }

        // const houses = await HouseModel.find({ listedBy: user._id })
        const houses = await HouseModel.find()
        houses.length > 0
            ? new NextResponse(
                  JSON.stringify({
                      message: "All houses",
                      data: houses,
                  }),
                  { status: 200 }
              )
            : new NextResponse(
                  JSON.stringify({
                      message: "User houses not found",
                      data: houses,
                  }),
                  { status: 404 }
              )
    } catch (error: any) {
        NextResponse.json({ error: error.message })
    }
}
