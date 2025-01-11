import { connect } from "@/lib/db"
import HouseModel from "@/models/House"
import { NextResponse } from "next/server"

export async function GET() {
    await connect()

    try {
        const houses = await HouseModel.find({})
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
                      data: houses,
                      message: "Houses not found",
                  }),
                  { status: 404 }
              )
        //   NextResponse.json({ data: houses, message: "All houses" })
    } catch (error: any) {
        NextResponse.json({ error: error.message })
    }
}
