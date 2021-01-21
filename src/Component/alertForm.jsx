import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Alert.css";
import axios from "axios";

export default function AlertForm(props) {

    const [alertInfo, setAlertInfo] = useState({});
    const [alertDone, setAlertDone] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Make the request .

        const res = axios.post("https://indigestion-prediction-backend.herokuapp.com/api/addAlert", alertInfo)
            .then(res => {
                // Say to the user that his alert has been token

                console.log("Done")
            }).catch(function (error) {
                // Say to the user that there is a problem
            });
        props.handleAlertDone();
        console.log(alertInfo);

    }

    useEffect(() => {
        setAlertInfo(props.restaurant);
    }, []);

    return (
        <div className className="form-container p-3">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicName" value={alertInfo.fullName} onChange={(e) => setAlertInfo({ ...alertInfo, fullName: e.target.value })}>
                        <Form.Label className="float-left">Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" required />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formBasicAdress" value={alertInfo.address} onChange={(e) => setAlertInfo({ ...alertInfo, address: e.target.value })}>
                    <Form.Label className="float-left">Your Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" required />
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
                </Form.Row>


                <Form.Row>

                    <Form.Group as={Col} controlId="formBasicDatePurchased" value={alertInfo.dateOfPurchase} onChange={(e) => setAlertInfo({ ...alertInfo, dateOfPurchase: e.target.value })}>
                        <Form.Label className="float-left">Date of Purchased</Form.Label>
                        <Form.Control type="date" placeholder="MM/DD/YYYY " required />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicDatePurchased" value={alertInfo.dateOfPurchase} onChange={(e) => setAlertInfo({ ...alertInfo, timeOfPurchase: e.target.value })}>
                        <Form.Label className="float-left">Time of Purchased</Form.Label>
                        <Form.Control type="text" placeholder="ss/mm/hhhh " required />
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
    )
}

