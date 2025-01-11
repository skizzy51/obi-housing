import { Schema, model, models } from "mongoose"

const House = new Schema(
    {
        location: { type: String, required: true },
        coordinates: {
            longitude: {
                type: Number,
                required: true,
            },
            latitude: {
                type: Number,
                required: true,
            },
        },
        price: { type: Number, required: true },
        images: { type: Array, required: true },
        listingType: { type: String, enum: ["rent", "sell"], default: "sell" },
        description: { type: String },
        primaryImage: { type: String },
        bathroom: { type: Number },
        bedroom: { type: Number },
        size: { type: String },
        dateBuilt: { type: String },
        amenities: [String],
        agentsAssigned: [{ type: Schema.Types.ObjectId, ref: "user" }],
        listedBy: { type: Schema.Types.ObjectId, ref: "user" },
    },
    { collection: "house", timestamps: true }
)

const HouseModel = models.House || model("User", House)

export default HouseModel
