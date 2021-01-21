import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from "react-bootstrap";
import "./Prediction.css";
import Charts from "./Charts";
import axios from "axios";
import OurPrediction from './ourPrediction';

export default function Prediction(props) {
    const [dataInspection, setDataInspection] = useState([]);
    const [labels, setLabels] = useState([]);
    const [dataGraph, setDataGraph] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios.get(`https://indigestion-prediction-backend.herokuapp.com/api/inspections/${props.restaurant.License}`)
            .then(function (response) {
                // handle success
                // console.log(response.data);
                const getLabels = response.data.map(element => {
                    return element.Inspection_Date;
                })
                // console.log(getLabels)
                setLabels(getLabels);
                const getRiskPred = response.data.map(element => {
                    return element.Risk_pred;
                })
                // console.log(getRiskPred);
                setDataGraph(getRiskPred);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            setLoading(true);
    }, [props])

    return (
      <>
        {loading && (
          <div className="pt-5 mx-3">
            {console.log(labels)}
            {console.log(dataGraph)}
            <h3 className="mb-5 text-center">
              Please read the information below about the restaurant
            </h3>
            {labels.length && dataGraph.length && (
              <div>
                <div className="container-prediction d-flex flex-row align-items-center justify-content-around ">
                  <OurPrediction License={props.restaurant.License} />
                </div>
                <br />
                <div className="container-prediction d-flex flex-row align-items-center justify-content-around">
                  <div className="history-restaurant">
                    <Form.Row className="mt-4 mx-3">
                      <Form.Group as={Col}>
                        <Form.Label className="ml-2 float-left">
                          Restaurant Name
                        </Form.Label>
                        <Form.Control
                          className="text-info"
                          value={props.restaurant.restaurantName}
                          name=""
                          type="text"
                          placeholder=""
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row className="mt-4 mx-3">
                      <Form.Group as={Col}>
                        <Form.Label className="ml-2 float-left">
                          Licence number
                        </Form.Label>
                        <Form.Control
                          className="text-info"
                          value={props.restaurant.License}
                          name=""
                          type="text"
                          placeholder=""
                        />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label className="ml-2 float-left">
                          number Of inspections
                        </Form.Label>
                        <Form.Control
                          className="text-info"
                          value={labels.length}
                          name=""
                          type="text"
                          placeholder=""
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row className="mx-3">
                      <Form.Group as={Col}>
                        <Form.Label className="ml-2 float-left">
                          first inspection
                        </Form.Label>
                        <Form.Control
                          className="text-info"
                          value={labels[0]}
                          name=""
                          type="text"
                          placeholder=""
                        />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label className="ml-2 float-left">
                          last inspection
                        </Form.Label>
                        <Form.Control
                          className="text-info"
                          value={labels[labels.length - 1]}
                          name=""
                          type="text"
                          placeholder=""
                        />
                      </Form.Group>
                    </Form.Row>
                  </div>
                  <div className="dougnut">
                    {console.log(labels)}
                    {console.log(dataGraph)}
                    {labels.length && dataGraph.length && (
                      <Charts labels={labels} dataGraph={dataGraph} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
}
