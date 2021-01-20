import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Alert.css"
import axios from "axios";
import Maps from "./Maps";


export default function Alert(props) {
    const [alertInfo, setAlertInfo] = useState({});
    const [alertDone, setAlertDone] = useState(false);
    const [longAndLat, setLongAndLat] = useState({ Longitude: "", Latitude: "" });


    const handleSubmit = (e) => {
        e.preventDefault();

        // Make the request .

        const res = axios.post("https://indigestion-prediction-backend.herokuapp.com/api/addAlert", alertInfo)
            .then(res => {
                // Say to the user that his alert has been token
                setAlertDone(true);
            }).catch(function (error) {
                // Say to the user that there is a problem
            });
        console.log(alertInfo);
        setAlertDone(true);
    }

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

   

    useEffect(() => {
        setAlertInfo(props.restaurant);
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
                    <div className className="form-container p-3">
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicName" value={alertInfo.fullName} onChange={(e) => setAlertInfo({ ...alertInfo, fullName: e.target.value })}>
                                    <Form.Label className="float-left">Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" required />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>

                                {/* <Form.Group as={Col} controlId="formBasicEmail" value={alertInfo.email} onChange={(e) => setAlertInfo({ ...alertInfo, email: e.target.value })}>
                                    <Form.Label className="float-left">Email</Form.Label>
                                    <Form.Control type="email" placeholder="Password" required />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group> */}
                            </Form.Row>

                            <Form.Group controlId="formBasicAdress" value={alertInfo.address} onChange={(e) => setAlertInfo({ ...alertInfo, address: e.target.value })}>
                                <Form.Label className="float-left">Your Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter adress" required />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicRestaurantName" >
                                    <Form.Label className="float-left" > Restaurant Name</Form.Label>
                                    <Form.Control type="text" placeholder={alertInfo.restaurantName} readOnly />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicRestaurantAdress" >
                                    <Form.Label className="float-left">Restaurant Address</Form.Label>
                                    <Form.Control type="text" placeholder={alertInfo.restaurantAddress} readOnly />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>
                            </Form.Row>


                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicItam" value={alertInfo.itemPurchased} onChange={(e) => setAlertInfo({ ...alertInfo, itemPurchased: e.target.value })}>
                                    <Form.Label className="float-left">Item Purchased</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Item Purchased" required />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicDatePurchased" value={alertInfo.dateOfPurchase} onChange={(e) => setAlertInfo({ ...alertInfo, dateOfPurchase: e.target.value })}>
                                    <Form.Label className="float-left">Date of Purchased</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Date of Purchased Like that: MM/DD/YYYY " required />
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>

                            </Form.Row>
                            <Form.Group controlId="formBasicTimePurchased" value={alertInfo.symptoms} onChange={(e) => setAlertInfo({ ...alertInfo, symptoms: e.target.value })}>
                                <Form.Label className="float-left">Symptoms </Form.Label>
                                <Form.Control type="text" placeholder="Enter the symptoms" required />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Button className="float-left" variant="primary" type="submit">
                                Submit
                    </Button>
                        </Form>
                    </div>
                    <div className="mx-3">
                        <Maps Latitude = {longAndLat.Latitude} Longitude = {longAndLat.Longitude}/>
                    </div>
                </div>
            </>}
        </>


    )
}
