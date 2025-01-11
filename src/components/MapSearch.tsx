import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import { useControl } from "react-map-gl"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

const AccessToken =
    "pk.eyJ1Ijoic2tpenp5NTEiLCJhIjoiY2x3ank4d2Z3MHRoNzJrbzRmOG11M2I4MSJ9.JX7TeBEc16yosVhqgNYfFQ"

export default function MapSearch() {
    const ctrl = new MapboxGeocoder({
        accessToken: AccessToken,
        marker: false,
        collapsed: true,
    })
    useControl(() => ctrl)
    ctrl.on("result", (e) => {
        const coords = e.result.geometry.coordinates
    })
    return null
}
