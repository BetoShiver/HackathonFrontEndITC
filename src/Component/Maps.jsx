import React, { useState, useEffect } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";



export default function Maps(props) {

    // const [nameCity, setNameCity] = useState(initialState)
    useEffect(() => {
        console.log(props.nameCity)
    }, [])
    const Map = () => {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: props.Latitude, lng: props.Longitude }}
            >

                {props.allRestaurant.map((element) => {
                    if (props.nameCity == element.City) {
                        return (
                            <Marker
                                key={element.License}
                                position={{
                                    lat: element.Latitude,
                                    lng: element.Longitude
                                }}
                            />
                        )
                    }
                }
                    // <Marker
                    //     key={city.License}
                    //     position={{ 
                    //         lat: city.Latitude, 
                    //         lng: city.Longitude 
                    //     }}
                    // />
                )}
            </GoogleMap>
        );
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    return (
        <div style={{ width: "470px", height: "640px" }}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBllmc_jF_IqNOPUz9l7_BW87gRZ9IZMC4`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            />
        </div>
    )
}
