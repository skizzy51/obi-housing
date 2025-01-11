import {
    Agent,
    FetchedPropertyObj,
    ListPropertyType,
    LoginDetails,
} from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export interface ReducerState {
    loggedIn: boolean
    token: string
    sidebarOpen: boolean
    loading: boolean
    savedLongitude: number
    savedLatitude: number
    listedProperty: {
        state: boolean
        id: string
    }
    property: FetchedPropertyObj
    properties: FetchedPropertyObj[]
    userProperties: FetchedPropertyObj[]
    agents: Agent[]
    requestsUsers: Agent[]
}

const initialState: ReducerState = {
    loggedIn: false,
    token: "",
    sidebarOpen: false,
    loading: false,
    savedLatitude: 41.860092,
    savedLongitude: -87.699329,
    listedProperty: {
        state: false,
        id: "",
    },
    property: {
        _id: "",
        location: "",
        coordinates: {
            longitude: 0,
            latitude: 0,
        },
        price: 0,
        images: [],
        listingType: "rent",
        description: "",
        primaryImage: "",
        bathroom: 0,
        bedroom: 0,
        size: "",
        dateBuilt: "",
        amenities: [],
        agentsAssigned: [],
    },
    properties: [],
    userProperties: [],
    agents: [],
    requestsUsers: [],
}

export const baseUrl = "https://obi-housing-server.vercel.app"

export const listProperty = createAsyncThunk(
    "listProperty",
    async (data: any, thunkAPI) => {
        try {
            let response = await fetch(`${baseUrl}/house`, {
                method: "POST",
                body: JSON.stringify(data.data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
            }).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const getProperty = createAsyncThunk(
    "getProperty",
    async (data: string, thunkAPI) => {
        try {
            let response = await fetch(`${baseUrl}/house/${data}`, {
                method: "GET",
                // headers: { Authorization: `Bearer ${data}` },
            }).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const getProperties = createAsyncThunk(
    "getProperties",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(`${baseUrl}/houses`, {
                method: "GET",
                // headers: { Authorization: `Bearer ${data}` },
            }).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const getUserProperties = createAsyncThunk(
    "getUserProperties",
    async (data: any, thunkAPI) => {
        try {
            let response = await fetch(`${baseUrl}/houses/user`, {
                method: "GET",
                headers: { Authorization: `Bearer ${data}` },
            }).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const getAgents = createAsyncThunk(
    "getAgents",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(`${baseUrl}/agent`, {
                method: "GET",
            }).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const getRequestsUsers = createAsyncThunk(
    "getRequestsUsers",
    async (data, thunkAPI) => {
        try {
            let response = await fetch(`${baseUrl}/request-users`, {
                method: "GET",
            }).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

export const becomeAnAgent = createAsyncThunk(
    "becomeAnAgent",
    async (data: any, thunkAPI) => {
        try {
            let response = await fetch(`${baseUrl}/agent`, {
                method: "POST",
                body: JSON.stringify(data.data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
            }).then((res) => res.json())
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(true)
        }
    }
)

const reducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        saveCoordinates: (state, action) => {
            state.savedLongitude = action.payload[0]
            state.savedLatitude = action.payload[1]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(listProperty.pending, (state) => {
                state.loading = true
            })
            .addCase(listProperty.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.message === "Successfully created") {
                    toast.success("Property successfully listed")
                    state.listedProperty = {
                        state: true,
                        id: action.payload.data._id,
                    }
                } else toast.error(action.payload.message)
            })
            .addCase(listProperty.rejected, (state, action) => {
                state.loading = false
                toast.error("Server error")
            })
            .addCase(getProperty.pending, (state) => {
                state.loading = true
            })
            .addCase(getProperty.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.message === "House found") {
                    state.property = action.payload.data
                } else toast.error(action.payload.message)
            })
            .addCase(getProperty.rejected, (state, action) => {
                state.loading = false
                toast.error("Server error")
            })
            .addCase(getProperties.pending, (state) => {
                state.loading = true
            })
            .addCase(getProperties.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.message === "All houses") {
                    state.properties = [...action.payload.data]
                } else if (action.payload.message === "Houses not found") return
                else toast.error(action.payload.message)
            })
            .addCase(getProperties.rejected, (state, action) => {
                state.loading = false
                toast.error("Server error")
            })
            .addCase(getUserProperties.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserProperties.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.message === "All houses") {
                    state.userProperties = [...action.payload.data]
                } else if (action.payload.message === "User houses not found")
                    return
                else toast.error(action.payload.message)
            })
            .addCase(getUserProperties.rejected, (state, action) => {
                state.loading = false
                toast.error("Server error")
            })
            .addCase(getAgents.pending, (state) => {
                state.loading = true
            })
            .addCase(getAgents.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.message === "All agents") {
                    state.agents = [...action.payload.data]
                } else toast.error(action.payload.message)
            })
            .addCase(getAgents.rejected, (state, action) => {
                state.loading = false
                toast.error("Server error")
            })
            .addCase(getRequestsUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getRequestsUsers.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.message === "All users") {
                    state.requestsUsers = [...action.payload.data]
                } else toast.error(action.payload.message)
            })
            .addCase(getRequestsUsers.rejected, (state, action) => {
                state.loading = false
                toast.error("Server error")
            })
            .addCase(becomeAnAgent.pending, (state) => {
                state.loading = true
            })
            .addCase(becomeAnAgent.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.message === "User updated") {
                    toast.success("Application approved")
                    window.location.reload()
                } else toast.error(action.payload.message)
            })
            .addCase(becomeAnAgent.rejected, (state, action) => {
                state.loading = false
                toast.error("Server error")
            })
    },
})

export const { toggleSidebar, saveCoordinates } = reducer.actions

export default reducer.reducer
