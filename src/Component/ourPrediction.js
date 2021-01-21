import './Prediction.css';
import { useState, useEffect } from 'react';


export default function OurPrediction(props) {
    const [predicted, setPredicted] = useState(1)

    // useEffect(() => {
    //     fetch(
    //       `https://indigestion-prediction-backend.herokuapp.com/api/inspections/${props.License}`
    //     ).then(data => {
    //         fetch('https://itc-yair-gunicorn-flask.herokuapp.com/json', {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //             },
    //             body: data
    //             })
    //             .then(r => r.json())
    //             .then(d => setPredicted(d))
    //         })
    //         .catch(e => console.log(e))

        
    // }, [])

    return (
      <div className="history-restaurant our">
        <h1>
          The predicted rating for this restaurant is: <b>{predicted}</b>{' '}
        </h1>
        <hr />
        <h5>What does this number Mean? </h5>
        <p>Restaurant are rated from 1 to 3.</p>
        <p>A rating of1 means the inspection passed the inspection.</p>
        <p>
          A rating of 2 means that the inspection passed, however warnings were
          issued.
        </p>
        <p>A rating of 3 means the establishment failed the inspection.</p>
      </div>
    );
}
