import React, { useState, useEffect } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";



export default function Maps(props) {

    const Map = () => {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: props.Latitude, lng: props.Longitude }}
            />
        );
    }
    
    const WrappedMap = withScriptjs(withGoogleMap(Map));

    return (
        <div style = {{width: "470px", height: "540px"}}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            />
        </div>
    )
}
