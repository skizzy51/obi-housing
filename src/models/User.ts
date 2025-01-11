import { Schema, model, models } from "mongoose"

const User = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, default: "" },
        profileConfirmed: { type: Boolean, default: false },
        role: { type: String, enum: ["user", "agent"], default: "user" },
        profileImage: { type: String, default: "" },
        rating: { type: Number, default: 0 },
        aboutMe: { type: String, default: "" },
        experience: { type: Number, default: 0 },
        specialization: [{ type: String }],
        language: { type: String, default: "" },
        fee: { type: Number, default: 0 },
        location: { type: String, default: "" },
        dealsClosed: { type: Number, default: 0 },
        propertiesManaged: [{ type: Schema.Types.ObjectId, ref: "house" }],
        authProvider: {
            state: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: "",
            },
        },
    },
    { collection: "user" }
)

const UserModel = models.User || model("User", User)

export default UserModel
