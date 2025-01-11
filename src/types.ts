export interface PropertyObject {
    type: string
    properties: {
        title: string
        description: string
    }
    geometry: {
        coordinates: number[]
        type: string
    }
}

export interface MapComponentProps {
    properties?: FetchedPropertyObj[]
    showLocationCircle?: boolean
    canPlaceMarker?: boolean
    setMarkerLongLat?: React.Dispatch<React.SetStateAction<setLongLatType>>
}

export interface LoginDetails {
    username: string
    password: string
}

export interface ListPropertyType {
    location: string
    coordinates: {
        longitude: number
        latitude: number
    }
    price: number
    images: any[]
    listingType: "rent" | "sell"
    description: string
    primaryImage: string
    bathroom: number
    bedroom: number
    size: string
    dateBuilt: string
    amenities: string[]
}

export interface FetchedPropertyObj {
    _id: string
    location: string
    coordinates: {
        longitude: number
        latitude: number
    }
    price: number
    images: PropertyImageObj[]
    listingType: "rent" | "sell"
    description: string
    primaryImage: string
    bathroom: number
    bedroom: number
    size: string
    dateBuilt: string
    amenities: string[]
    agentsAssigned: any[]
}

export interface NextAuthUserData {
    id: string
    email: string
    name: string
    profileConfirmed: boolean
    role: string
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
}

export interface Agent {
    _id: string
    email: string
    name: string
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
}

export type AuthProviderType = {
    state: boolean
    type: string
}

type setLongLatType = {
    longitude: number
    latitude: number
}

type PropertyImageObj = {
    asset_id: string
    public_id: string
    url: string
    signature: string
}
