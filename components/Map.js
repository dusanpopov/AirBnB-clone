import React, {useState} from 'react'
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import { getCenter } from 'geolib';

const Map = ({searchResults}) => {

    const [selectedLocation, setSelectedLocation] = useState({});
    // Transform search results object into latitude/longitude
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const centerPoint = getCenter(coordinates);
    
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: centerPoint.latitude,
        longitude: centerPoint.longitude,
        zoom: 11
    });

    return <ReactMapGL
    mapStyle="mapbox://styles/dusanpopov/ckwa5o3mr7lmw15o409y7x3qg"
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewport}
    onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
        {searchResults.map(result => (
            <div key={result.long}>
                <Marker  
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}>
                        <p role="img" onClick={() => setSelectedLocation(result)}className="cursor-pointer text-2xl animate-bounce" aria-label="push-pin">
                        📌
                        </p>
                </Marker>
                {selectedLocation.long === result.long ? (
                    <Popup
                        onClose={() => setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                    >
                        {result.title}
                    </Popup>
                ) : (false)}
            </div>
        ))}
    </ReactMapGL>
}
export default Map
