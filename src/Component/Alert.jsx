import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Alert.css"
import axios from "axios";
import Maps from "./Maps";
import AlertForm from "./alertForm";

export default function Alert(props) {
    // const [alertInfo, setAlertInfo] = useState({});
    const [alertDone, setAlertDone] = useState(false);
    const [longAndLat, setLongAndLat] = useState({ Longitude: "", Latitude: "" });


    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Make the request .

    //     const res = axios.post("https://indigestion-prediction-backend.herokuapp.com/api/addAlert", alertInfo)
    //         .then(res => {
    //             // Say to the user that his alert has been token
    //             setAlertDone(true);
    //         }).catch(function (error) {
    //             // Say to the user that there is a problem
    //         });
    //     console.log(alertInfo);
    //     setAlertDone(true);
    // }

    const updateLongAndLat = () => {
        for (let index = 0; index < props.allRestaurant.length; index++) {
            if (props.allRestaurant[index].License == props.restaurant.License) {
                const Longitude = props.allRestaurant[index].Longitude;
                const Latitude = props.allRestaurant[index].Latitude;
                setLongAndLat({ Longitude: Longitude, Latitude: Latitude });
            }
        }
    }



    const handleAnotherAlert = () => {
        setAlertDone(false);
    };

    const handleAlertDone = () => {
        setAlertDone(true);
    };


    useEffect(() => {
        // setAlertInfo(props.restaurant);
        console.log(props.nameCity)
        updateLongAndLat();
        // AIzaSyBllmc_jF_IqNOPUz9l7_BW87gRZ9IZMC4
    }, []);




    return (
        <>
            {alertDone &&
                <div>
                    <h3 className="pt-5 pb-5">Your alert has been token. Thank you for your time</h3>
                    <Button className="" onClick={() => handleAnotherAlert()}>Create another alert ?</Button>
                </div>
            }
            {!alertDone && <>
                <h3 className="pt-5">Create an Alert</h3>
                <div className="myContainer  d-flex flex-row justify-content-around">
                    <AlertForm restaurant={props.restaurant} handleAlertDone={() => handleAlertDone()} />
                    <div className="mx-3">
                        <Maps
                            Latitude={longAndLat.Latitude}
                            Longitude={longAndLat.Longitude}
                            allRestaurant={props.allRestaurant}
                            nameCity = {props.nameCity}
                        />
                    </div>
                </div>
            </>}
        </>


    )
}
