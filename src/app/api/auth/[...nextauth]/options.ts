import type { NextAuthOptions, Profile } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider, {
    CredentialInput,
} from "next-auth/providers/credentials"
import { baseUrl } from "@/redux/reducer"
import { Account, User as AuthUser } from "next-auth"
import { connect } from "@/lib/db"
import UserModel from "@/models/User"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { toast } from "react-toastify"

export const options: NextAuthOptions = {
    session: {
        strategy: "jwt", // or "database" for database sessions
        maxAge: 60 * 60, // Session duration in seconds. 60 * 60 is 1 hour
    },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
                authType: {},
                username: {},
            },
            async authorize(credentials) {
                try {
                    const user = await UserModel.findOne({
                        email: credentials?.email,
                        "authProvider.state": false,
                    })

                    if (credentials?.authType === "login") {
                        if (!user) {
                            return null
                        }
                        if (
                            await bcrypt.compare(
                                credentials?.password!,
                                user.password
                            )
                        ) {
                            const jwtToken = jwt.sign(
                                { id: user._id },
                                process.env.CIPHER!,
                                {
                                    expiresIn: "1h",
                                }
                            )

                            return {
                                ...user.toObject(),
                                accessToken: jwtToken,
                                id: user._id,
                            }
                        } else {
                            toast.error("Incorrect password")
                            return null
                        }
                    } else if (credentials?.authType === "signUp") {
                        if (user) {
                            toast.error("Email already in use")
                            return null
                        }
                        const hashedPassword = await bcrypt.hash(
                            credentials.password,
                            10
                        )
                        const createdUser = new UserModel({
                            email: credentials.email,
                            password: hashedPassword,
                            name: credentials.username,
                        })
                        await createdUser.save()
                        if (!createdUser) {
                            toast.error("Error creating user")
                            return null
                        }
                        const jwtToken = jwt.sign(
                            { id: createdUser._id },
                            process.env.CIPHER!,
                            {
                                expiresIn: "1h",
                            }
                        )

                        return {
                            ...createdUser.toObject(),
                            accessToken: jwtToken,
                            id: createdUser._id,
                        }
                    }

                    // let response = await fetch(`${baseUrl}/login`, {
                    //     method: "POST",
                    //     body: JSON.stringify({
                    //         email: credentials?.email,
                    //         password: credentials?.password,
                    //     }),
                    //     headers: { "Content-Type": "application/json" },
                    // }).then((res) => res.json())

                    // if (response?.message === "Logged In") {
                    //     const { user } = response.data
                    //     const { _id, token, ...editedUser } = user
                    //     return {
                    //         ...editedUser,
                    //         accessToken: user.token,
                    //         id: user._id,
                    //     }
                    // } else return null
                } catch (error: any) {
                    throw new Error(error)
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                return { ...token, ...user }
            }
            return token
        },
        async session({ session, token }) {
            session.user = token as any
            return session
        },
        async signIn({
            user,
            account,
            profile,
            email,
            credentials,
        }: {
            user: AuthUser
            account: Account | null
            profile?: Profile
            email?: {
                verificationRequest?: boolean
            }
            credentials?: Record<string, CredentialInput>
        }) {
            if (account?.provider === "credentials") {
                return true
            } else if (account?.provider === "github") {
                try {
                    let response = await fetch(`${baseUrl}/user`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: user.email,
                            provider: account.provider,
                        }),
                        headers: { "Content-Type": "application/json" },
                    }).then((res) => res.json())
                    if (response?.message === "User found") {
                        const fetchedUser = response.user
                        const { _id, token, ...editedUser } = fetchedUser
                        const assignObj = {
                            ...editedUser,
                            accessToken: fetchedUser.token,
                            id: fetchedUser._id,
                            name: user.name,
                            profileImage:
                                fetchedUser.profileImage.length < 1
                                    ? user.image
                                    : fetchedUser.profileImage,
                        }
                        Object.assign(user, assignObj)
                        return true
                    }

                    await connect()
                    const userSignUp = new UserModel({
                        email: user.email,
                        password: "none",
                        name: user.name,
                        authProvider: {
                            state: true,
                            type: account.provider,
                        },
                    })
                    await userSignUp.save()
                    if (!userSignUp) return false
                    else {
                        const jwtToken = jwt.sign(
                            { id: userSignUp._id },
                            process.env.CIPHER!,
                            {
                                expiresIn: "1h",
                            }
                        )
                        const userData = {
                            ...userSignUp.toObject(),
                            token: jwtToken,
                        }
                        const { _id, token, ...editedUser } = userData
                        const assignObj = {
                            ...editedUser,
                            accessToken: userData.token,
                            id: userData._id,
                            name: user.name,
                            profileImage: user.image,
                        }
                        Object.assign(user, assignObj)
                        return true
                    }

                    // let res = await fetch(`${baseUrl}/sign-up-provider`, {
                    //     method: "POST",
                    //     body: JSON.stringify({
                    //         email: user.email,
                    //         provider: account.provider,
                    //         name: user.name,
                    //     }),
                    //     headers: { "Content-Type": "application/json" },
                    // }).then((res) => res.json())
                    // if (res.message === "Successfully created") {
                    //     const fetchedUser = res.data.user
                    //     const { _id, token, ...editedUser } = fetchedUser
                    //     const assignObj = {
                    //         ...editedUser,
                    //         accessToken: fetchedUser.token,
                    //         id: fetchedUser._id,
                    //         name: user.name,
                    //         profileImage: user.image,
                    //     }
                    //     Object.assign(user, assignObj)
                    //     return true
                    // } else return false
                } catch (error) {
                    return false
                }
            } else if (account?.provider === "google") {
                try {
                    let response = await fetch(`${baseUrl}/user`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: user.email,
                            provider: account.provider,
                        }),
                        headers: { "Content-Type": "application/json" },
                    }).then((res) => res.json())
                    if (response?.message === "User found") {
                        const fetchedUser = response.user
                        const { _id, token, ...editedUser } = fetchedUser
                        const assignObj = {
                            ...editedUser,
                            accessToken: fetchedUser.token,
                            id: fetchedUser._id,
                            name: user.name,
                            profileImage:
                                fetchedUser.profileImage.length < 1
                                    ? user.image
                                    : fetchedUser.profileImage,
                        }
                        Object.assign(user, assignObj)
                        return true
                    }

                    await connect()
                    const userSignUp = new UserModel({
                        email: user.email,
                        password: "none",
                        name: user.name,
                        authProvider: {
                            state: true,
                            type: account.provider,
                        },
                    })
                    await userSignUp.save()
                    if (!userSignUp) return false
                    else {
                        const jwtToken = jwt.sign(
                            { id: userSignUp._id },
                            process.env.CIPHER!,
                            {
                                expiresIn: "1h",
                            }
                        )
                        const userData = {
                            ...userSignUp.toObject(),
                            token: jwtToken,
                        }
                        const { _id, token, ...editedUser } = userData
                        const assignObj = {
                            ...editedUser,
                            accessToken: userData.token,
                            id: userData._id,
                            name: user.name,
                            profileImage: user.image,
                        }
                        Object.assign(user, assignObj)
                        return true
                    }

                    // let res = await fetch(`${baseUrl}/sign-up-provider`, {
                    //     method: "POST",
                    //     body: JSON.stringify({
                    //         email: user.email,
                    //         provider: account.provider,
                    //         name: user.name,
                    //     }),
                    //     headers: { "Content-Type": "application/json" },
                    // }).then((res) => res.json())
                    // if (res.message === "Successfully created") {
                    //     const fetchedUser = res.data.user
                    //     const { _id, token, ...editedUser } = fetchedUser
                    //     const assignObj = {
                    //         ...editedUser,
                    //         accessToken: fetchedUser.token,
                    //         id: fetchedUser._id,
                    //         name: user.name,
                    //         profileImage: user.image,
                    //     }
                    //     Object.assign(user, assignObj)
                    //     return true
                    // } else return false
                } catch (error) {
                    return false
                }
            }
            return true
        },
    },
}
