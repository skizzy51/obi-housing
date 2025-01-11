// Import the NextAuth module to extend its types
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

type AuthProviderType = {
    state: boolean
    type: string
}

// Extend the built-in types for User, JWT, and Session
declare module "next-auth" {
    // Extend the User interface to include custom fields
    // interface User {
    //     id: string
    //     email: string
    //     name: string
    //     profileConfirmed: boolean
    //     role: string
    //     profileImage: string
    //     rating: number
    //     aboutMe: string
    //     experience: number
    //     specialization: string[]
    //     language: string
    //     fee: number
    //     location: string
    //     dealsClosed: number
    //     propertiesManaged: any[]
    //     authProvider?: AuthProviderType
    //     accessToken?: string
    // }

    // // Extend the JWT (JSON Web Token) to include custom fields
    // interface JWT {
    //     id: string
    //     email: string
    //     name: string
    //     profileConfirmed: boolean
    //     role: string
    //     profileImage: string
    //     rating: number
    //     aboutMe: string
    //     experience: number
    //     specialization: string[]
    //     language: string
    //     fee: number
    //     location: string
    //     dealsClosed: number
    //     propertiesManaged: any[]
    //     authProvider?: AuthProviderType
    //     accessToken?: string
    // }

    // Extend the Session interface to include custom user fields in the session object
    interface Session {
        user: {
            id: string
            email: string
            name: string
            profileConfirmed: boolean
            role: "agent" | "user"
            profileImage: string
            rating: number
            aboutMe: string
            experience: number
            specialization: string[]
            language: string
            fee: number
            location: string
            dealsClosed: number
            propertiesManaged: any[]
            authProvider?: AuthProviderType
            accessToken?: string
        } & DefaultSession["user"] // Extend with the default user fields like name and email
    }
}
